const express = require("express");
const app = express();

app.get("/", function(request,response){
  response.send("Hello");
})

app.get("/contact", function(request,response){
  response.send("mailto:abhinav@email.com");
})

app.get("/about", function(request,response){
  response.send("Name: Abhinav Sorate");
})

app.get("/hobbies", function(request,response){
  response.send("<ul><li>Music</li><li>Movies</li></ul>");
})

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
