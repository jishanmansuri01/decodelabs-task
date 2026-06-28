require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ── Test Route ───────────────────────────────────────────────
// This confirms the server is alive and responding.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Job Portal API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ── Root Route ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Job Portal Backend - Task 2 in progress");
});

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`👉 Test it: http://localhost:${PORT}/api/health`);
});