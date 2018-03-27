const express = require("express");
const storage = require("node-persist");

const ads = require("./models/ads");
const users = require("./models/users");

const app = express();
const port = 3000;

storage.initSync({ dir: "data/" });
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

function handle(route) {
  return (req, res) => {
    try {
      route(req, res);
    } catch (e) {
      res.sendStatus(e.message);
    }
  };
}

app.post("/login", handle((req, res) => {
  res.send(users.login(storage, {
    email: req.body.email,
    password: req.body.password
  }));
}));

app.get("/ads", handle((req, res) => {
  res.send(ads.findAll(storage));
}));

app.get("/ads/:id", handle((req, res) => {
  res.send(ads.findOne(storage, req.params.id));
}));

app.get("/my-ads", handle((req, res) => {
  res.send(ads.findByUser(storage, users.findOneFromRequest(storage, req)));
}));

app.post("/ads", handle((req, res) => {
  ads.create(storage, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  }, users.findOneFromRequest(storage, req));

  res.sendStatus(201);
}));

app.put("/ads/:id", handle((req, res) => {
  ads.update(storage, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  }, users.findOneFromRequest(storage, req), req.params.id);

  res.sendStatus(204);
}));

app.delete("/ads/:id", handle((req, res) => {
  ads.delete(storage, users.findOneFromRequest(storage, req), req.params.id);
  res.sendStatus(204);
}));

app.listen(port, () => console.log("TheGoodSpot API started at http://localhost:" + port));
