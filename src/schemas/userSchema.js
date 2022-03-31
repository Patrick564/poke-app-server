const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  gid: String,
  name: String,
  email: String,
  picture: String,
  favorites: Array
})

const User = mongoose.model('User', userSchema)

module.exports = User
