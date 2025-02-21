const express = require("express");
const router = express.Router();
const JobType = require("../models/JobType");

router.get("/get/all", async (req, res) => {
  try {
    const jobTypes = await JobType.find();
    res.status(200).send(jobTypes);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const jobType = new JobType({
      jobType: req.body.jobType,
    });
    await jobType.save();
    res.status(201).send(jobType);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await JobType.deleteOne({ _id: req.params.id });
    res.status(200).send("Job Type deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await JobType.updateOne(
      { _id: req.params.id },
      { $set: { jobType: req.body.jobType } }
    );
    res.status(200).send("Job Type updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
