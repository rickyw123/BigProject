const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: [true, 'Email has been taken!'],
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    password: {
        type: String,
        required : [true, 'Please Provide Your Password To Login'],
        minlength : 10
    },
    role: {
        type : String,
        default : 'user'
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function(providedPassword) { // kegunaan compare mengcompare password yang diketik user dengan hash password, jika keduanya sama, dia bakalan return true, jika tidak sama false
    return await bcrypt.compare(providedPassword, this.password);
}

UserSchema.methods.generateJwToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) // expiresIn untuk expired login
}

module.exports = mongoose.model('user', UserSchema);