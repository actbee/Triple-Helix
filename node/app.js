const express = require('express');
const path = require('path');
const dalle = require('./routes/dalle')
const port = process.env.PORT || 5000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dalle', dalle);

app.listen(port, ()=>console.log('server started on port ', port));
module.exports = app;
