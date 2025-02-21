db = connect("mongodb://root:root@localhost:27017/records?authSource=admin");

print("Creating users collection");

db.createCollection("users", { capped: false });

// Create a user called admin with the password admin

db.users.insert({
  fullname: "Admin",
  username: "admin",
  password: "$2b$10$ZxnKroVgELEB3BF2v/oRtOoJ/fL9BR6dEx/iIJRh/H249Uv8/5D7e",
});

print("users collection created");

print("Creating jobs collection");

db.createCollection("JobType", { capped: false });

const joblist = [
  {
    jobType: "Clean bathroom",
  },
  {
    jobType: "Mop kitchen",
  },
  {
    jobType: "Hoover living room",
  },
  {
    jobType: "Empty/load dishwasher",
  },
  {
    jobType: "Polsih windows",
  },
  {
    jobType: "Clean oven",
  },
  {
    jobType: "Walk Dogs",
  },
  {
    jobType: "Feed Dogs",
  },
  {
    jobType: "Hover Downstairs",
  },
  {
    jobType: "Hover Upstairs",
  },
  {
    jobType: "Clean Dog Poos",
  },
];

db.JobType.insertMany(joblist);

print("jobs collection created");