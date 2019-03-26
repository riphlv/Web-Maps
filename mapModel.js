const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapDataSchema = new Schema({
    name: {type : String , default : 'null'},
    info: {type : String , default : 'null'},
    lat: {type : Number , required : true},
    lng: {type : Number , required : true}
});

module.exports = mongoose.model('MapData', MapDataSchema);