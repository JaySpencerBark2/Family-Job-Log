const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  JobType: {
    type: String,
    default: "",
  },
  Description: {
    type: String,
    default: "",
  },
  CompletedDate: {
    type: Date,
    default: "",
  },
});

module.exports = mongoose.model("jobs", jobSchema);
