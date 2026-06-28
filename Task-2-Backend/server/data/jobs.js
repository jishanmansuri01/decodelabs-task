// Temporary in-memory storage — replaced by MongoDB in Task 3.

let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹8-12 LPA",
    category: "Engineering",
    description: "Build pixel-perfect UIs using React and Tailwind.",
    skills: ["React", "TypeScript", "Tailwind"],
    postedBy: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "CloudBridge Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "₹12-18 LPA",
    category: "Engineering",
    description: "Work across the stack with Node.js, React and MongoDB.",
    skills: ["Node.js", "React", "MongoDB"],
    postedBy: 1,
    createdAt: new Date().toISOString(),
  },
];
let nextId = 3;

module.exports = {
  getAll: () => jobs,
  findById: (id) => jobs.find((j) => j.id === Number(id)),
  create: (job) => {
    const newJob = { id: nextId++, createdAt: new Date().toISOString(), ...job };
    jobs.push(newJob);
    return newJob;
  },
  update: (id, updates) => {
    const index = jobs.findIndex((j) => j.id === Number(id));
    if (index === -1) return null;
    jobs[index] = { ...jobs[index], ...updates };
    return jobs[index];
  },
  remove: (id) => {
    const index = jobs.findIndex((j) => j.id === Number(id));
    if (index === -1) return false;
    jobs.splice(index, 1);
    return true;
  },
};