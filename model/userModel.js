const { Schema, model } = require("mongoose");

const common = {
    type: String,
    required: true,
    trim: true
}

const userSchema = new Schema({
    user_name: {
        ...common
    },
    user_email: {
        ...common
    },
    user_password: {
        ...common
    }
},
    {
        timestamps: true
    }

);

const User = model('User', userSchema)
module.exports = User