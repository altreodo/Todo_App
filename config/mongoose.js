//require library
const mongoose=require('mongoose');
//connecting to database
mongoose.connect('mongodb://localhost/Todo_app_db');
//aquire the connection (check if it is succesfull)
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'Connection lost'));
//up and running then printing the message
db.once('open',function(){
    console.log("Succesfully connected to database")
});