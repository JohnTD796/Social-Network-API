const { Schema, model } = require('mongoose');
const Thought = require('./thought');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [emailRegex, 'Please fill in a valid email address']
        },

        thoughts: [Thought],

        friends: [User],

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return `${this.friends.length}`
});

const User = model('thought', userSchema)

module.exports = User;