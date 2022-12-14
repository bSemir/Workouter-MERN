const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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

    //validaton
    if (!email || !password)
        throw Error('All fields must be filled!');

    if (!validator.isEmail(email))
        throw Error('Email is not valid!');

    if (!validator.isStrongPassword(password))
        throw Error('Password not strong enough!');

    const exist = await this.findOne({ email });

    if (exist) {
        throw Error('Email already in use'); //good info message?
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash }); //'this' bc we don't have a user yet

    return user;

}

// our static login method on model that we use in userController
userSchema.statics.login = async function (email, password) {
    if (!email || !password)
        throw Error('All fields must be filled!');

    const user = await this.findOne({ email });

    if (!user)
        throw Error('Incorrect email'); //wrong credentials

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        throw Error('Incorrect password');

    return user;
}


module.exports = mongoose.model('User', userSchema); //model

