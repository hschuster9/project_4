const mongoose = require('mongoose')
const db = mongoose.connection




mongoose.connect('mongodb://localhost/project4', err =>{
  if(err){
    console.log(err)
  }
  else {
    console.log("Connected to MongoDB")
  }
})

module.exports = mongoose
