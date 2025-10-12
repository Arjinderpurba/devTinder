const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address: " + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a srong password: " + value);
      }
    }
  },
  age: {
    type: Number,
    min: 18,
    trim: true,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid photo Url " + value);
      }
    }
  }, 
  about: {
    type: String,
    default: "This is a default about of the user!",
    trim: true,
  },
  skills: {
    type: [String],
    trim: true,
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User; 