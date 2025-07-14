const mongoose = require("mongoose");

const connectionStringForAtlas = "";

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("connected to atlas mongodb");
        
    } catch (error) {
        console.erro("could not connect to atlas mongodb");
        
    }
}

module.exports = connectToAtlasDb;