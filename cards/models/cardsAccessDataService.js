const { createError } = require("../../utils/handleErrors");
const Card = require("./mogoDb/Card");

const DB = "MONGODB";

// Create Card
const createCard = async (newCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(newCard);
      card = await card.save();
      return card;
    } catch (error) {
      return createError("Mongoose", error.message, error.status);
    }
  }
};

// Get Cards
const getAllCards = async () => {
  if (DB === "MONGODB") {
    try {
      let cards = await Card.find();
      return cards;
    } catch (error) {
      return createError("Mongoose", error.message, 500);
    }
  }
};

// Get card by id
const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      return card;
    } catch (error) {
      return createError("Mongoose", error.message, 400);
    }
  }
};

// Get my cards
const getMyCards = async (userId) => {
  try {
    let myCards = await Card.find({ user_id: userId });
    return myCards;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

// Update cards
const updateCard = async (cardId, updatedCard) => {
  try {
    let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
    return card;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};

// Delete cards
const deleteCard = async (cardId) => {
  try {
    let card = await Card.findByIdAndDelete(cardId);
    return card;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};
// Like card
const likeCard = async (cardId, userId) => {
  try {
    let card = await Card.findById(cardId);
    if (!card) {
      return createError("Mongoose" , "A card with this ID cannot be found")
    }
    if (card.likes.includes(userId)) {
      let newLikesArray = card.likes.filter((id) => id != userId);
      card.likes = newLikesArray;
    } else {
      card.likes.push(userId);
    }
    await card.save();
    return card;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCard,
  getMyCards,
  updateCard,
  deleteCard,
  likeCard,
};
