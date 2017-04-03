const express = require('express')
const hbs = require('express-handlebars')
const parser = require('body-parser')
const mongoose = require('./db/connection')

const app = express()
const router = express.Router()

const Item = mongoose.model("Item")

app.set("port", process.env.PORT || 8000)
app.set('view engine', 'hbs')
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}))

app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

//root url
app.get('/', function(req, res){
  res.render("items")
})


//show all items
app.get("/api/items", function(req, res){
  Item.find({}).then(function(items){
    res.json(items)
  })
})

//show individual item
app.get('/api/items/:title', function(req, res){
  Item.findOne({title: req.params.title}).then(function(item){
    res.json(item)
  })
})


//increase upvote
app.put('/api/items/upvote', function(req, res, next){
  req.item.upvote(function(err, item){
    if(err){return next(err)}
    res.json(item)
  })
})

router.put('/items/:title/upvote', function(req, res, next){
  req.item.upvote(function(err, item){
    if(err) {return next(err)}
    res.json(item)
  })
})

//create new item
app.post('/api/items', function(req, res){
  Item.create(req.body).then(function(item){
    res.json(item)
  })
})

//update item
app.put("/api/items/:title", function(req, res){
  Item.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then(function(item){
    res.json(item)
  })
})

//delete item
app.delete('/api/items/:title', function(req, res){
  Item.findOneAndRemove({title: req.params.title}).then(function(){
    res.json({success: true})
  })
})


app.listen(app.get("port"), function(){
  console.log("Listening on Port 8000");
});
