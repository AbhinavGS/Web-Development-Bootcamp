
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")        // requiring mongoose

mongoose.connect('mongodb://127.0.0.1:27017/todolist');   // connect to server

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({       //create schema
  name : String
});

const Item = mongoose.model("Item", itemsSchema);       //create model

const item1 = new Item({        // document
  name : "First item"
});

const item2 = new Item({        // document
  name : "Second item"
});

const item3 = new Item({        // document
  name : "Third item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  Item.find({}, function(err,foundItems){
   if (foundItems.length === 0) {                 //if there are no initial documents, add dafault ones
    Item.insertMany(defaultItems, function(err){
        if (!err){
          console.log("All items added successfully!");
        }
      });
      res.redirect("/")
   } else {
     res.render("list", {listTitle:"Today", newListItems:foundItems})
   }
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox
  Item.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log("Item deleted successfully")
    }
  })
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
