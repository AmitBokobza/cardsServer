const { generateToken } = require("../../auth/providers/jwt");
const User = require("./mongoDb/User");
const { createError } = require("../../utils/handleErrors");

//register new user
const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    return createError("Mongoose", error.message)
  }
};

// get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return createError("Mongoose", error.message)
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return createError("Mongoose", error.message)
  }
};

// login user
const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({email})
    if(!userFromDb){
      return createError("Authentication", "User not found")
    }

    if (userFromDb.password != password){
      return createError("Authentication", "Invalid email or password")
    }

    const token = generateToken(userFromDb);
    return token;

  } catch (error) {
    return createError("Authentication", error.message)
  }
};

module.exports = { registerUser, getUser, getAllUsers, loginUser };
