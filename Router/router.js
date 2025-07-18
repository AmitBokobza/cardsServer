const express = require("express")
const cardsRouter = require("../cards/Routes/cardsRestController");
const userRouter = require("../users/Routes/userRestController");
const { handleError } = require("../utils/handleErrors");
const router = express.Router();

router.use("/cards", cardsRouter);
router.use("/users", userRouter);

router.use((req,res) => {
    return handleError(res, 404, "Path not Found")
})

module.exports = router;
