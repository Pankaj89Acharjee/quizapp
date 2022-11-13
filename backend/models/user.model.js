const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, required: [true, 'Email must be unique'], unique: true },
    password: { type: String, required: [true, 'Password must be 8 characters long'] },
    designation: { type: String },
    city: { type: String},
    mobile: { type: Number}
},
    //{ collection: 'allusers'}, Not req if given in connection string
    { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel