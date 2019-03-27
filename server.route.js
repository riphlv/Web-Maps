const express = require('express');
const app = express();
const serverRoutes = express.Router();

let MapModel = require('./mapModel');

serverRoutes.route('/add').post(function(req,res){
    let data = new MapModel(req.body);
    console.log(data);
    data.save().then(data=>{
        res.status(200).json({'data':'data added successfuly'});
    }).catch(err=>{
        res.status(400).send('error on add');
    });
});

serverRoutes.route('/get').get(function(req,res){
    MapModel.find(function(err,data){
        if(err){
            console.log("error");
        }else{
            res.json(data);
        }
    });
});

serverRoutes.route('/get/:name').get(function(req,res){
    let name = req.params.name;
    // Tries to find in DB for matching name, either in name or info
    MapModel.find({ $or:[
        {name: {$regex: new RegExp(name, "i")}},
        {info: {$regex: new RegExp(name, "i")}}
    ]},function(err,data){
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    });
});

serverRoutes.route('/edit/:id').get(function(req,res){
    let id = req.params.id;
    MapModel.findById(id,function(err,data){
        res.json(data);
    });
});

serverRoutes.route('/update/:id').post(function(req,res){
    console.log(req.params.id);
    MapModel.findById(req.params.id,function(err,data){
        
        console.log(">>>",data);
        if(!data){
            console.log('Error on edit',data);
        }else{
            data.name = req.body.name; 
            data.info = req.body.info;
            data.lat = req.body.lat;
            data.lng = req.body.lng;
            data.save().then(data=>{
                res.json('Data updated');
            }).catch(err=>{
                res.status(400).send('Couldnt update data');
            });
        }
    });
});

serverRoutes.route('/delete/:id').get(function (req, res) {
    MapModel.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = serverRoutes;