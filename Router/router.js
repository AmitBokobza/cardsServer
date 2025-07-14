const express = require("express")
const cardsRouter = require("../cards/Routes/cardsRestController");
const userRouter = require("../users/Routes/userRestController");
const router = express.Router();

router.use("/cards", cardsRouter);
router.use("/users", userRouter);

router.use((req,res) => {
    res.status(404).send("Path Not Found")
})

module.exports = router;
