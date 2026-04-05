require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 5000;

const requiredEnvVars = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "JWT_SECRET", "CLIENT_URL"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  // eslint-disable-next-line no-console
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  // eslint-disable-next-line no-console
  console.error("Create server/.env from server/.env.example before running the API.");
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Task Tracker API is running" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
