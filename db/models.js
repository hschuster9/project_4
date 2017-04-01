const mongoose = requre('./connection.js')


const ReviewSchema = new mongoose.Schema({
  author: String,
  content: String,

})

const ItemSchema = new mongoose.Schema({
  title: String,
  photo_url: String,
  upvotes: Number,
  maker: String,
  description: String,
  price: Number,
  reviews: [ReviewSchema]
})





const Item = mongoose.model("Item", ItemSchema)
const Review = mongoose.model("Review", ReviewSchema)

module.exports = {
  Item,
  Review
}
