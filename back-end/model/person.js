const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const personSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'please give id of the person'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'please give name of the person'],
    },
    password: {
        type: String,
        minlength: 6,
    },
})

personSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

personSchema.methods.createJWT = function(){
    return jwt.sign(
        {username: this.name, id: this.id},
        process.env.JWT_SECRET,
        {expiresIn:'30d'}
    )
}

personSchema.methods.comparePassword = function(candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('Person', personSchema);
