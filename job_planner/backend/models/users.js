//make me a user model
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: ""
    }
});

userSchema.methods.validPassword = function(password) {
    hashedPassword = bcrypt.hashSync(this.password, 10);
    let result = bcrypt.compareSync(password, this.password);

    //I want to pritn out the two companted passwords

    console.log("Password is", password, "Stored password", this.password);

    return result;
};

// Pre-save hook to hash the password before saving
userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('users', userSchema);
