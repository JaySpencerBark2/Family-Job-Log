const express = require('express');
const router = express.Router();
let UserHelper = require('../helpers/userHelper');

// Route to get all users
router.get('/get/all', async (req, res) => {
  try {
    let helper = new UserHelper();
    const user = await helper.getUsers();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


router.post('/add', async (req, res) => {
  try{

    let userHelper = new UserHelper();
    const user = await userHelper.addUsers(req.body);
    res.status(200).send(user);
  }catch(err){
    res.status(400).send(err);
    console.log(err);
  }
});

router.post('/update', async (req, res) => {
  try{
    let helper = new UserHelper();
    let user = await helper.updateUser(req.body);
    res.status(200).send(user);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/delete/:userID', async (req, res) => {
  try{
    let helper = new UserHelper();
    let user = await helper.deleteUser(req.params.userID);
    res.status(200).send(user);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;