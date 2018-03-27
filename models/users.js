const getNextId = require("../getNextId");

module.exports = {
  init(storage) {
    storage.setItemSync("users", []);
  },

  findAll(storage) {
    const users = storage.getItemSync("users");

    if (!Array.isArray(users)) {
      return [];
    }

    return users;
  },

  findOne(storage, id) {
    const user = this.findAll(storage).find(user => user.id === parseInt(id));

    if (!user) {
      throw new Error(404);
    }

    return user;
  },

  findOneFromRequest(storage, req) {
    const matches = String(req.headers.authorization).match(/User (\d+)/) || [];
    matches.shift();

    try {
      return this.findOne(storage, matches.shift());
    } catch (e) {
      throw new Error(401);
    }
  },

  login(storage, { email, password }) {
    if (!email || !password) {
      throw new Error(400);
    }

    const user = this.findAll(storage).find(user => user.email === email && user.password === password);

    if (!user) {
      throw new Error(401);
    }

    return user;
  },

  create(storage, { name, email, password }) {
    if (!name || !email || !password) {
      throw new Error(400);
    }

    const users = this.findAll(storage);

    storage.setItemSync("users", [...users, {
      id: getNextId(users),
      name,
      email,
      password
    }]);
  }
};
