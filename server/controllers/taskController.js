const pool = require("../db");

const createTask = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING id, user_id, title, completed, created_at",
      [userId, title.trim()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task" });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT id, user_id, title, completed, created_at FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const toggleTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const existingTask = await pool.query(
      "SELECT id, completed FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId]
    );

    if (existingTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const currentCompleted = existingTask.rows[0].completed;
    const updatedTask = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING id, user_id, title, completed, created_at",
      [!currentCompleted, taskId, userId]
    );

    return res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task" });
  }
};

const markTaskCompleted = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const updatedTask = await pool.query(
      "UPDATE tasks SET completed = TRUE WHERE id = $1 AND user_id = $2 RETURNING id, user_id, title, completed, created_at",
      [taskId, userId]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to mark task as completed" });
  }
};

module.exports = {
  createTask,
  getTasks,
  toggleTask,
  markTaskCompleted,
};
