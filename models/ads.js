const users = require("./users");
const getNextId = require("../getNextId");

function normalizePrice(price) {
  price = parseInt(price);
  return isNaN(price) ? null : price;
}

module.exports = {
  init(storage) {
    storage.setItemSync("ads", []);
  },

  findAll(storage, format = true) {
    return storage.getItemSync("ads").map(ad => {
      if (format) {
        try {
          const user = users.findOne(storage, ad.userId);
          delete user.password;
          ad.user = user;
        } catch (e) {
          throw new Error(500);
        }

        delete ad.userId;
      }

      return ad;
    });
  },

  findOne(storage, id) {
    const ad = this.findAll(storage).find(ad => ad.id === parseInt(id));

    if (!ad) {
      throw new Error(404);
    }

    return ad;
  },

  findOneForUser(storage, user, id) {
    const ad = this.findOne(storage, id);

    if (ad.user.id !== user.id) {
      throw new Error(401);
    }

    return ad;
  },

  findByUser(storage, user) {
    return this.findAll(storage).filter(ad => ad.user.id === user.id);
  },

  create(storage, { title, description, price }, user) {
    if (!title || !description || price === undefined) {
      throw new Error(400);
    }

    const ads = this.findAll(storage, false);

    storage.setItemSync("ads", [...ads, {
      id: getNextId(ads),
      title,
      description,
      price: normalizePrice(price),
      userId: user.id
    }]);
  },

  update(storage, { title, description, price }, user, id) {
    if (!title || !description || price === undefined) {
      throw new Error(400);
    }

    this.findOneForUser(storage, user, id);

    storage.setItemSync("ads", this.findAll(storage, false).map(ad => {
      if (ad.id !== parseInt(id)) {
        return ad;
      }

      return {
        ...ad,
        title,
        description,
        price: normalizePrice(price)
      };
    }));
  },

  delete(storage, user, id) {
    this.findOneForUser(storage, user, id);
    storage.setItemSync("ads", this.findAll(storage, false).filter(ad => ad.id !== parseInt(id)));
  }
};
