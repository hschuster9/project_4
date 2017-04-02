const Item = require("./models.js").Item
const Review = require('./models.js').Review

Item.remove({}, err =>{
  if(err){
    console.log(err)
  }
})

Review.remove({}, err => {
  if(err) {
      console.log(err)
    }
})


var scallop_shirt = new Item({
  "title": "Scallop Shirt",
  "photo_url": "http://g.nordstromimage.com/ImageGallery/store/product/Zoom/3/_9956483.jpg",
  "upvote": 0,
  "maker": "J.Crew",
  "description": "This top is comfortable and simple",
  "price": 40
})

var horse_watch = new Item({
  "title": " Horse Watch",
  "photo_url": "https://cdn.shopify.com/s/files/1/0233/5133/products/Polished-Rose-Gold_Blush-Leather_1_335x335.jpg?v=1441941608",
  "upvote": 0,
  "maker": "The Horse",
  "description": "Love the rose gold and leather band",
  "price": 140
})

var navy_jumpsuit = new Item({
  "title": "Navy Jumpsuit",
  "photo_url": "http://nord.imgix.net/Zoom/3/_11604543.jpg?fit=fill&fm=jpg&dpr=2&h=368&w=240&q=30",
  "upvote": 0,
  "maker": "Nordstrom",
  "description": "Perfect for a night out",
  "price": 180
})


var review1 = new Review({
  "author": "Mary",
  "content": "Love this!"
})

var review2 = new Review({
  "author": "Kate",
  "content": "Definitely recommend!"
})

var review3 = new Review({
  "author": "Becky",
  "content": "So cute"
})

scallop_shirt.reviews.push(review1)
scallop_shirt.save((err, item)=>{
  if(err){
    console.log(err)
  } else {
    console.log(item)
  }
})

horse_watch.reviews.push(review2)
horse_watch.save((err, item)=>{
  if(err){
    console.log(err)
  } else{
    console.log(item)
  }
})

navy_jumpsuit.reviews.push(review3)
navy_jumpsuit.save((err, item)=>{
  if(err){
    console.log(err)
  } else{
    console.log(item)
  }
})
