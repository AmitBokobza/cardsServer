const express = require("express");
const {
  createCard,
  getAllCards,
  getCard,
  updateCard,
  getMyCards,
  deleteCard,
  likeCard,
} = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const normalizeCard = require("../helpers/normalizeCard");
const { handleError, createError } = require("../../utils/handleErrors");
const router = express.Router();

//create new card
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return createError("Authorization", "Only business users can create new card", 403)
    }
    let normalizedCard = await normalizeCard(req.body, userInfo._id);
    let card = await createCard(normalizedCard);
    res.status(201).send(card);
  } catch (error) {
    handleError(res,error.status,error.message)
  }
});

//get all cards
router.get("/", async (req, res) => {
  try {
    let allCards = await getAllCards();
    res.status(200).send(allCards);
  } catch (error) {
    return handleError(res, error.status , error.message)
  }
});

//get my cards
router.get("/my-cards", auth, async (req, res) => {
  try {
    // const {id} = req.body;
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return createError("Authorization", "Onlu business users can get my cards", 403)
    }

    let myCards = await getMyCards(userInfo._id);
    res.status(200).send(myCards);
  } catch (error) {
    return handleError(res, error.status, error.message)
  }
});

//get card by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, 400, error.message)
  }
});

//update card
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = req.user;
    const originalCard = await getCard(id);

    if (!userInfo.isAdmin && userInfo._id != originalCard.user_id) {
      return createError("Authorization", "Only the card creator or admin can update card", 403)
    }

    let normalizedCard = await normalizeCard(req.body, userInfo._id)
    let card = await updateCard(id, normalizedCard);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message)
  }
});

//delete card
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;

    const originalCard = await getCard(id);

    if (!userInfo.isAdmin && userInfo._id != originalCard.user_id) {
      return createError("Authorization", "Only the card creator or admin can delete card", 403);
    }
    let card = await deleteCard(id);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message)
  }
});

//like card
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    let card = await likeCard(id, userId);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, 400, error.message)
  }
});
module.exports = router;
