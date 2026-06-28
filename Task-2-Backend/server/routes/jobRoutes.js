const express = require("express");
const router = express.Router();
const jobsDB = require("../data/jobs");
const { verifyToken, verifyRole } = require("../middleware/auth");

// ── GET /api/jobs — list all jobs (public, with optional filters) ──
router.get("/", (req, res) => {
  let jobs = jobsDB.getAll();

  const { category, type, location, search } = req.query;

  if (category && category !== "All") {
    jobs = jobs.filter((j) => j.category === category);
  }
  if (type && type !== "All") {
    jobs = jobs.filter((j) => j.type === type);
  }
  if (location && location !== "All") {
    jobs = jobs.filter((j) => j.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  res.status(200).json({ count: jobs.length, jobs });
});

// ── GET /api/jobs/:id — single job detail (public) ──────────
router.get("/:id", (req, res) => {
  const job = jobsDB.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }
  res.status(200).json({ job });
});

// ── POST /api/jobs — create a job (employer only, requires login) ──
router.post("/", verifyToken, verifyRole("employer"), (req, res) => {
  const { title, company, location, type, salary, category, description, skills } = req.body;

  if (!title || !company || !location || !type || !category) {
    return res.status(400).json({ message: "title, company, location, type and category are required." });
  }

  const newJob = jobsDB.create({
    title,
    company,
    location,
    type,
    salary: salary || "Not disclosed",
    category,
    description: description || "",
    skills: skills || [],
    postedBy: req.user.id,
  });

  res.status(201).json({ message: "Job posted successfully.", job: newJob });
});

// ── PUT /api/jobs/:id — update a job (employer only, must own it) ──
router.put("/:id", verifyToken, verifyRole("employer"), (req, res) => {
  const job = jobsDB.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }
  if (job.postedBy !== req.user.id) {
    return res.status(403).json({ message: "You can only edit jobs you posted." });
  }

  const updated = jobsDB.update(req.params.id, req.body);
  res.status(200).json({ message: "Job updated successfully.", job: updated });
});

// ── DELETE /api/jobs/:id — remove a job (employer only, must own it) ──
router.delete("/:id", verifyToken, verifyRole("employer"), (req, res) => {
  const job = jobsDB.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }
  if (job.postedBy !== req.user.id) {
    return res.status(403).json({ message: "You can only delete jobs you posted." });
  }

  jobsDB.remove(req.params.id);
  res.status(200).json({ message: "Job deleted successfully." });
});

module.exports = router;