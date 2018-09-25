const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    userImage: {
        type: String,
        default: 'default.png'
    },
    facebook: {
        type: String,
        default: ""
    },
    fbTokens: Array,
    googel: {
        type: String,
        default: ""
    },
    googleTokens: Array
});

userSchema.methods.encryptPassword =(password)=>{
    return bcrypt.hashSync(password,10,null);
};

userSchema.methods.validUserPassword =function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('UserDataBase', userSchema);