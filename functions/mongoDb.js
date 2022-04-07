const mongoose = require('mongoose');
const config = require('../config.json');
const mongoUrl = config.mongoUrl;

const startDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("db connected");
    } catch (e) {
        console.log("bad connect", e);
    }
}

module.exports = {startDB};