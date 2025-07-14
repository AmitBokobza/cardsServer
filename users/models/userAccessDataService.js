const { generateToken } = require("../../auth/providers/jwt");
const User = require("./mongoDb/User");

//register new user
const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    throw new Error("Mongoose " + error.message);
  }
};

// get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Mongoose " + error.message);
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Mongoose " + error.message);
  }
};

// login user
const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({email})
    if(!userFromDb){
      throw new Error("Authentication error: User not found")
    }

    if (userFromDb.password != password){
      throw new Error("Authentication error: Invalid email or password")
    }

    const token = generateToken(userFromDb);
    return token;

  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { registerUser, getUser, getAllUsers, loginUser };
