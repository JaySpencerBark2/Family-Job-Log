const users = require("../models/users");
const bcrypt = require("bcrypt");

module.exports = class UserHelper {
  async addUsers(user) {
    try {
      const newUser = new users(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUsers() {
    try {
      const allUsers = await users.find();
      return allUsers;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateUser(user) {
    try {
      if (user.password !== "") {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }

      if (user.password === "") {
        delete user.password;
      }

      const updatedUser = await users.findOneAndUpdate(
        { _id: user._id },
        user,
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteUser(userID) {
    try {
      const deletedUser = await users.deleteOne({ _id: userID });
      return deletedUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
