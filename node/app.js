const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config()
const dalle = require('./routes/dalle')
const test = require('./routes/users')

const port = process.env.PORT || 5000;


const app = express();
const cors = require("cors");
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use('/dalle', dalle);
app.use('/dalle', test);



app.get('/', function(req, res){
  console.log("hiii!");
  res.send("hello");
})

//app.listen(port, ()=>console.log('server started on port ', port));

module.exports = app;
