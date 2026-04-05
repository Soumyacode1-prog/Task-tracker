import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const response = await api.post("/tasks", { title });
      setTasks((prev) => [response.data, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      setError("");
      const response = await api.patch(`/tasks/${taskId}/complete`);
      setTasks((prev) => prev.map((task) => (task.id === taskId ? response.data : task)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark task as completed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-ink">Your Tasks</h1>
          <p className="mt-1 text-sm text-ink/70">Mark tasks completed from each card.</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-ink px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
        >
          Logout
        </button>
      </header>

      <section className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-lg">
        <form onSubmit={handleAddTask} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to get done?"
            className="flex-1 rounded-xl border border-ink/20 px-4 py-2.5 outline-none transition focus:border-ink"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-ink px-5 py-2.5 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Adding..." : "Add Task"}
          </button>
        </form>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        {loading ? (
          <p className="mt-6 text-sm text-ink/70">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="mt-6 text-sm text-ink/70">No tasks yet. Add your first task above.</p>
        ) : (
          <div className="mt-6 grid gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={handleComplete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TasksPage;
