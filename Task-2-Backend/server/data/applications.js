// Temporary in-memory storage — replaced by MongoDB in Task 3.

let applications = [];
let nextId = 1;

module.exports = {
  getAll: () => applications,
  findById: (id) => applications.find((a) => a.id === Number(id)),
  findByJobId: (jobId) => applications.filter((a) => a.jobId === Number(jobId)),
  findByApplicantId: (applicantId) => applications.filter((a) => a.applicantId === applicantId),
  hasAlreadyApplied: (jobId, applicantId) =>
    applications.some((a) => a.jobId === Number(jobId) && a.applicantId === applicantId),
  create: (application) => {
    const newApp = { id: nextId++, appliedAt: new Date().toISOString(), status: "Pending", ...application };
    applications.push(newApp);
    return newApp;
  },
  updateStatus: (id, status) => {
    const app = applications.find((a) => a.id === Number(id));
    if (!app) return null;
    app.status = status;
    return app;
  },
};