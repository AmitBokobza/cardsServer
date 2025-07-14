const _ = require("lodash");
const Card = require("../models/mogoDb/Card");

const generateBizNumber = async () => {
  let cardsCount = Card.countDocuments();
  if (cardsCount === 8_999_999) {
    throw new Error("The app reached maximum cards amount");
  }

  let random;

  do {
    random = _.random(1_000_000, 9_000_000);
  } while (await isBizNumberExist(random));

  return random;
};

const isBizNumberExist = async (bizNum) => {
  try {
    const cardWithThisBizNum = await Card.findOne({ bizNum });
    return Boolean(cardWithThisBizNum);
  } catch (err) {
    throw new Error("Mongoose: " + error.message);
  }
};

module.exports = generateBizNumber;