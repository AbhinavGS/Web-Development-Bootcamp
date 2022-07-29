const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
var items = ["First","Second"];
var workItems = []

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    let day = date();
    res.render("list", {listTitle:day, newItems:items});
});

app.post("/", function(req,res) {
    var item = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
    res.redirect("/");
    }
       
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle:"Work List", newItems:workItems});
});


app.listen(3000, function() {
    console.log("Server started on port 3000")
})