// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     max: 50,
//   },
//   likedMovies: Array,
// });

// module.exports = mongoose.model("users", userSchema);

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    likedMovies: Array,
  });

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
