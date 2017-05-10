const mongoose = require('mongoose');

var url = new mongoose.Schema({
  path: {type: String, required: true},
  key: {type: String, unique: true},
  clicks: {type: Number, default: 0},
})

// after I finish- add   data: {
//     clicks: {type: Number, default: 0},
//     countries: []
// },
var urls =  mongoose.model('urls',url);
module.exports = urls;
