const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  title: String,
  photo_url: String,
  upvotes: {type: Number, default: 0},
  maker: String,
  description: String,
  price: Number
})

ItemSchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb)
}

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
