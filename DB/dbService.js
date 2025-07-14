const connectToAtlasDb = require("./mongoDb/connectToAtlas");
const connectToLocalDb = require("./mongoDb/connectToMonogodbLocally");

const ENVIROMENT = "development";
const DB = "MONGODB";

const connectToDb = async () => {
  if (DB === "MONGODB") {
    if (ENVIROMENT === "development") {
      await connectToLocalDb();
    }

    if (ENVIROMENT === "production") {
      await connectToAtlasDb();
    }
  }
};

module.exports = connectToDb;
