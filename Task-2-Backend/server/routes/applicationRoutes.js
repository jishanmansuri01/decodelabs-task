const express = require("express");
const router = express.Router();
const applicationsDB = require("../data/applications");
const jobsDB = require("../data/jobs");
const { verifyToken, verifyRole } = require("../middleware/auth");

// ── POST /api/applications — apply to a job (seeker only) ──────
router.post("/", verifyToken, verifyRole("seeker"), (req, res) => {
  const { jobId, phone, resume, coverNote } = req.body;

  if (!jobId || !phone || !resume) {
    return res.status(400).json({ message: "jobId, phone and resume are required." });
  }

  const job = jobsDB.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }

  if (applicationsDB.hasAlreadyApplied(jobId, req.user.id)) {
    return res.status(409).json({ message: "You have already applied to this job." });
  }

  const newApplication = applicationsDB.create({
    jobId: Number(jobId),
    jobTitle: job.title,
    company: job.company,
    applicantId: req.user.id,
    applicantEmail: req.user.email,
    phone,
    resume,
    coverNote: coverNote || "",
  });

  res.status(201).json({ message: "Application submitted successfully.", application: newApplication });
});

// ── GET /api/applications/my — seeker's own applications ───────
router.get("/my", verifyToken, verifyRole("seeker"), (req, res) => {
  const myApps = applicationsDB.findByApplicantId(req.user.id);
  res.status(200).json({ count: myApps.length, applications: myApps });
});

// ── GET /api/applications/job/:jobId — employer views applicants for one job ──
router.get("/job/:jobId", verifyToken, verifyRole("employer"), (req, res) => {
  const job = jobsDB.findById(req.params.jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }
  if (job.postedBy !== req.user.id) {
    return res.status(403).json({ message: "You can only view applicants for jobs you posted." });
  }

  const apps = applicationsDB.findByJobId(req.params.jobId);
  res.status(200).json({ count: apps.length, applications: apps });
});

// ── PUT /api/applications/:id/status — employer updates applicant status ──
router.put("/:id/status", verifyToken, verifyRole("employer"), (req, res) => {
  const { status } = req.body;
  const allowed = ["Pending", "Shortlisted", "Rejected", "Hired"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${allowed.join(", ")}` });
  }

  const updated = applicationsDB.updateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ message: "Application not found." });
  }

  res.status(200).json({ message: "Application status updated.", application: updated });
});

module.exports = router;