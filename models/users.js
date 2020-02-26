const db = require("../database/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
    .catch(err => {
      console.log(err)
    })
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}