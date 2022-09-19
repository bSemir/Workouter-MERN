const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// our static signup method on model(we can create others too)
userSchema.statics.signup = async function (email, password) {

    const exist = await this.findOne({ email });

    if (exist) {
        throw Error('Email already in use'); //good info message?
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash }); //'this' bc we don't have a user yet

    return user;

}

module.exports = mongoose.model('User', userSchema); //model

