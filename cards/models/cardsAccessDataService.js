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
      throw new Error("mongoose: " + error.message);
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
      throw new Error("mongoose: " + error.message);
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
      throw new Error("mongoose: " + error.message);
    }
  }
};

// Get my cards
const getMyCards = async (userId) => {
  try {
    let myCards = await Card.find({ user_id: userId });
    return myCards;
  } catch (error) {
    throw new Error("mongoose: " + error.message);
  }
};

// Update cards
const updateCard = async (cardId, updatedCard) => {
  try {
    let card = await Card.findByIdAndUpdate(cardId, updatedCard, {new:true});
    return card;
  } catch (error) {
    throw new Error("mongoose: " + error.message);
  }
}

// Delete cards
const deleteCard = async (cardId) => {
  try {
    let card = await Card.findByIdAndDelete(cardId);
    return card;
  } catch (error) {
    throw new Error("mongoose: " + error.message);
  }
}
// Like card
const likeCard = async (cardId, userId) => {
  try {
    let card = await Card.findById(cardId);
    if (!card){
      throw new Error("A card with this ID cannot be found")
    }
    if (card.likes.includes(userId)){
      let newLikesArray = card.likes.filter((id) => id != userId)
      card.likes = newLikesArray
    } else{
      card.likes.push(userId)
    }
    await card.save();
    return card;
  } catch (error) {
    throw new Error("mongoose: " + error.message);
  }
}





module.exports = { createCard, getAllCards, getCard, getMyCards, updateCard, deleteCard, likeCard};
