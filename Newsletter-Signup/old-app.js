const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

mailchimp.setConfig({
 apiKey: "7c582442871edf8d29da1a878d32b2f6-us14",
 server: "us14"
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

const listId = "e5b1d3540a";

const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};

 async function run() {
 const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});

//   const data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_field: {
//           FNAME: firstName,
//           LNAME: lastName
//         }
//       }
//     ]
//   };
//
//   const jsonData = JSON.stringify(data);
//   const url = "https://us14.api.mailchimp.com/3.0/lists/e5b1d3540a";
//
//   const option = {
//     method: "POST",
//     auth: "AbhinavGS:7c582442871edf8d29da1a878d32b2f6-us14"
//   };
//
//   const request = https.request(url, options, function(response){
//     response.on("data",function(data){
//       console.log(JSON.parse(data));
//     })
//   })
//
//   request.write(jsonData);
//   request.end();
// });



app.listen(3000, function(){
  console.log("Server is started on port 3000.")
});



// APIKey
// 7c582442871edf8d29da1a878d32b2f6-us14
// ID
// e5b1d3540a
