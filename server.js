const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose')
const serverRoute = require('./server.route');
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://localhost:27017/web-maps",{ useNewUrlParser: true }, function(err,response){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to DB");
    }
});

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
app.use('/crud',serverRoute);

const server = app.listen(port,function(){
    console.log("Listening on port " + port);
});