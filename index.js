// const express = require('express')
// const hbs = require('express-handlebars')
// const parser = require('body-parser')
// const mongoose = require('./db/connection')
//
// const app = express()
//
// const Item = mongoose.model("Item")
//
// app.use("/assets", express.static("public"))
// app.use(parser.json({extended: true}))
//
//
// app.set("port", process.env.PORT || 3000)
// app.set('view engine', 'hbs')
// app.engine(".hbs", hbs({
//   extname: ".hbs",
//   partialsDir: "views/",
//   layoutsDir: "views/",
//   defaultLayout: "layout-main"
// }))
//
//
// app.get("/", (req, res) => {
//   res.send("Hello");
// })
//
// app.get("/api/items", function(req,res){
//   Item.find({}).then(function(items){
//     res.json(items)
//   })
// })
//
//
// app.get('/api/items/:title', function(req, res){
//   Note.findOne({title: req.params.title}).then(function(item){
//     res.json(item)
//   })
// })
//
//
// app.listen(app.get("port"), function(){
//   console.log("Listening on port 3000");
// })

const express = require('express')
const hbs = require('express-handlebars')
const parser = require('body-parser')
const mongoose = require('./db/connection')

const app = express()

const Item = mongoose.model("Item")

app.set("port", process.env.PORT || 9111)
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
// app.get('/', function(req, res){
//   res.render("items")
// })


//show all items
app.get("/api/items", function(req, res){
  Item.find({}).then(function(items){
    res.json(items)
  })
})

app.post("/api/items", function(req,res){
  Item.create(req.body).then(function(item){
    res.json(item)
  })
})

//show individual item
app.get('/api/items/:title', function(req, res){
  Item.findOne({title: req.params.title}).then(function(item){
    res.json(item)
  })
})


/
app.listen(app.get("port"), function(){
  console.log("Listening on Port 9111");
});
