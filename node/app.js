const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dalle = require('./routes/dalle')
const test = require('./routes/users')
const port = process.env.PORT || 5000;
const cors = require("cors");

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(cors());
app.use('/dalle', dalle);
app.use('/dalle', test);


app.get('/', function(req, res){
  console.log("hiii!");
  res.send("hello");
})

app.listen(port, ()=>console.log('server started on port ', port));
module.exports = app;
