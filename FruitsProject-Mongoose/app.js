const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

 
const fruitSchema = new mongoose.Schema ({
	name: {
    type: String,
    required: true
  },
	rating: Number,
	review: String
});
 
const Fruit = mongoose.model ("Fruit", fruitSchema);
 
const pineapple = new Fruit ({
	name: "Pineapple",
	rating: 7,
	review: "I love it"
});

// pineapple.save()



// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if (err){
//     console.log(err)
//   } else {
//     console.log("Deleted")
//   }
// })

// fruit.save();

// const banana = new Fruit ({
// 	name: "Banana",
// 	rating: 8,
// 	review: "Fruit with built in packaging!"
// })

// const orange = new Fruit ({
// 	name: "Orange",
// 	rating: 6,
// 	review: "Best immunity booster!"
// })

const jackfruit = new Fruit ({
	name: "Jackfruit",
	rating: 8,
	review: "Underrated fruit of all time"
})

// Fruit.insertMany([banana, orange, jackfruit], function(err) {
//   console.log("Mission successfull")
// }) 

// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err)
//   } else {
//     mongoose.connection.close();
//     fruits.forEach(element => {
//       console.log(element.name)
//     });
//   }
// })

const personSchema = new mongoose.Schema ({
  name : String,
  age : Number,
  favouriteFruit : fruitSchema
});

const Person = mongoose.model ("Person", personSchema);

// const person = new Person ({
//   name : "Sushila",
//   age : 50,
//   favouriteFruit : pineapple
// });

// person.save()

Person.updateOne({name : "Abhinav"}, {favouriteFruit : jackfruit}, function(err) {
  if (err){
    console.log(err)
  } else {
    console.log("Entry updated successfully")
  }
})