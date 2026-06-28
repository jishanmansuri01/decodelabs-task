// Temporary in-memory storage — replaced by MongoDB in Task 3.
// Each user: { id, name, email, password (hashed), role, company }

let users = [];
let nextId = 1;

module.exports = {
  getAll: () => users,
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === id),
  create: (user) => {
    const newUser = { id: nextId++, ...user };
    users.push(newUser);
    return newUser;
  },
};