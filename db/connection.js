const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  title: String,
  photo_url: String,
  upvotes: Number,
  maker: String,
  description: String,
  price: Number
})


mongoose.model("Item", ItemSchema)

mongoose.connect('mongodb://localhost/project4', err =>{
  if(err){
    console.log(err)
  }
  else {
    console.log("Connected to MongoDB")
  }
})

module.exports = mongoose
