const mongoose = require('./connection')
const seedData = require('./seeds.json')
const Item = mongoose.model("Item")





Item.remove({}).then(function(){
  Item.collection.insert(seedData).then(function(){
    process.exit()
})
})
