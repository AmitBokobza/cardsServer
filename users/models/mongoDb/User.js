const mongoose = require("mongoose");
const Name = require("../../../helpers/mongoDb/Name");
const { PHONE, EMAIL } = require("../../../helpers/mongoDb/mongooseValidator");
const Image = require("../../../helpers/mongoDb/Images");
const Address = require("../../../helpers/mongoDb/Address");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: PHONE,
  email: EMAIL,
  password: {
    type: String,
    minLength: 7,
    maxLength: 20,
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
