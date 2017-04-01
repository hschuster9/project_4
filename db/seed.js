const Item = require("./models.js").Item
const Review = require('./models.js').Review

Item.remove({}, err =>{
  if(err){
    console.log(err)
  }
})

Review.remove({}, err => {
  if(err) {
    console.log(err){
      console.log(err)
    }
  }
})
