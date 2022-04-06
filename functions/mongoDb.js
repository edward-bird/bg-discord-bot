const mongoose = require('mongoose');
//const dbClient = new MongoClient("mongodb+srv://edward:1234@cluster0.6ulcw.mongodb.net/bg-discord-bot?retryWrites=true&w=majority");
const mongoUrl = 'mongodb+srv://edward:1234@cluster0.6ulcw.mongodb.net/bg-discord-bot?retryWrites=true&w=majority'

const startDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("db connected");
    } catch (e) {
        console.log("bad connect", e);
    }
}

module.exports = {startDB};