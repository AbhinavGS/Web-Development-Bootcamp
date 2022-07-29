const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/", function(req,res) {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = Math.round(weight/(Math.pow(height,2)))

    res.write("Your BMI is "+bmi+".")
    

    if (bmi < 18.5){
        res.write(" You are underweight. Eat something!")
    }
    else if (bmi > 18.5 && bmi < 24.9){
        res.write(" Yor are healthy. Keep it up.")
    }
    else{
        res.write(" You are fat. Don't eat too much junk!")
    }
    res.send()

})

app.listen(3000, function(req, res) {
    console.log("Server started on port 3000")
})