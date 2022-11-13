const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname+".env")});

//connectionStr = process.env.MONGODBURL;
//console.log('here...', path.resolve(__dirname, '../.env'), process.env.MONGODBURL)
const dbConnect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODBURL, {
            useNewUrlParser: true
        });
        if(connection) {
            console.log("Connection to DB Established!");
        }
    } catch(error) {
        console.log("DB Connection Error", error.message);
    }
}

module.exports = dbConnect