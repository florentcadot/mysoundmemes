dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "florent",
  pwd: "justdoit",
  roles: [{ role: "root", db: "admin" }],
});
dbAdmin.auth({
  user: "florent",
  pwd: "justdoit",
});

db = new Mongo().getDB("mysoundmemes")
db.createUser(
  {
    user: "florent",
    pwd: "justdoit",
    roles: ["readWrite", "dbAdmin"]
  }
)
db.createCollection("mockCollection", { capped: false })
db.user.insert({
  mockField: 'mockValue'
})