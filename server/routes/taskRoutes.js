const express = require("express");
const { createTask, getTasks, toggleTask, markTaskCompleted } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", toggleTask);
router.patch("/:id/complete", markTaskCompleted);

module.exports = router;
