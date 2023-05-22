db.createCollection("IoTPlatform");
db.IoTPlatform.insert({
  id: 1,
  username: "cartoon",
  email: "cartoon@gmail.com",
  password: "2b$08$ZOYPCNCwckqIis3MRTuN2OkXpSmEuyUColY9kFbAE6YHKNIIgkzo.",
  role: "user",
});

db.IoTPlatform.insert({
  id: 2,
  username: "kwan",
  email: "ckwan@gmail.com",
  password: "2b$08$STucTEU4ZcVc8mnNx37yL.u0Z65.RoSxczFbIem2CMT.mt0lCxI7S",
  role: "user",
});

db.IoTPlatform.insert({
  id: 3,
  username: "por",
  email: "por@gmail.com",
  password: "2b$08$STucTEU4ZcVc8mnNx37yL.u0Z65.RoSxczFbIem2CMT.mt0lCxI7S",
  role: "user",
});

db.createUser({
  user: "toon",
  pwd: "1234",
  roles: [{ role: "readWrite", db: "IoTPlatform" }],
});
