const express = require("express");
const router = express.Router();
const Jobs = require("../models/Jobs");

router.get("/get/all", async (req, res) => {
    try{
        let data = await Jobs.find();
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message: err.message})
        console.log(err)
    }
});


router.post("/add", async (req, res) => {
    try{
        let data = req.body;
        await Jobs.create(data);
        res.status(200).json({message: "Job added successfully"})
    }catch(err)
    {
        res.status(500).json({message: err.message})
        console.log(err)
    }
});


router.delete("/delete/:id", async (req, res) => {




});


router.put("/update/:id", async (req, res) => {



});


module.exports = router