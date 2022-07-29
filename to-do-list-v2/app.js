
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");        // require mongoose
const lodash = require('lodash');            // require lodash

mongoose.connect('mongodb://127.0.0.1:27017/todolist');   // connect to server

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));    //make folders available on server

const itemsSchema = new mongoose.Schema({       //create schema for items
  name : String
});

const listsSchema = new mongoose.Schema({       //create schema for custom list
  name : String,
  items : [itemsSchema]
});

const Item = mongoose.model("Item", itemsSchema);       //create model for items

const List = mongoose.model("List", listsSchema);       //create model for custom list

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

app.get("/:customListName", function(req, res) {        //create custom route
  const customListName = lodash.capitalize(req.params.customListName);
  List.findOne({name : customListName}, function(err, foundList) {
    if (!err){
      if (!foundList){
        const customList = new List({       //document for custom lists
          name : customListName,
          items : defaultItems
        });
        
        customList.save()
        res.redirect("/" + customListName)

      } else {
          res.render("list", {listTitle:foundList.name, newListItems:foundList.items})
      }
    }
  })
});



app.post("/", function(req, res){       //add item in list
  const itemName = req.body.newItem;
  const listTitle = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listTitle === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listTitle}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listTitle)
    });
  }

  
});

app.post("/delete", function(req, res) {        //delete item from list
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Item deleted successfully")
      }
    })
    res.redirect("/");
  } else  {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err){
        res.redirect("/" + listName)
      }
    })
  }

});

app.listen(3000, function() {       //local server hosting on port 3000
  console.log("Server started on port 3000");
});
