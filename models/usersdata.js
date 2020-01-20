const mongoose = require('mongoose');

const contact_schema = mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("usersdata", contact_schema);