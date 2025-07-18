const _ = require("lodash");
const Card = require("../models/mogoDb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
  let cardsCount = Card.countDocuments();
  if (cardsCount === 8_999_999) {
    return createError(
      "Mongoose",
      "The app reached the maximuc cards amount",
      409
    );
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
    return createError("Mongoose", error.message, 500)
  }
};

module.exports = generateBizNumber;
