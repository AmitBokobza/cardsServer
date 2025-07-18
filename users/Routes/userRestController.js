const express = require("express");
const { registerUser, getUser, getAllUsers, loginUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const { handleError, createError } = require("../../utils/handleErrors");

const router = express.Router();


//create new user
router.post("/", async (req,res) => {
    try {
        let newUser = req.body;
        let user = await registerUser(newUser);
        res.status(201).send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})


// login user
router.post("/login", async (req,res) => {

    try {
        let { email, password} = req.body;
        const token = await loginUser(email,password);
        res.send(token);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})

// get user by id
router.get("/:id",auth, async(req,res) => {
    try {
        let userInfo = req.user;
        const {id} = req.params;
        const user = await getUser(id);
        if(!userInfo.isAdmin && userInfo._id != user._id){
            return createError("Authorization", "Only the user or admin user can show detailes", 403)
        }

        res.status(200).send(user);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})


// get all users
router.get("/",auth, async (req,res) => {
    try {
        const userInfo = req.user;  
        if(!userInfo.isAdmin){
            return createError("Authorization" , "Only admin user can get all users list", 403)
        }

        let users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
module.exports = router;