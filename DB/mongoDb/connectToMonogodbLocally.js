const mongoose = require("mongoose");

const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/cardsServer");
        console.log("Connected To MongoDb Locally");
    } catch (error) {
        console.error("Could not connect to MongoDb", error);
    }
};

module.exports = connectToLocalDb;