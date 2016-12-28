var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var movieSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    production: {
        type: String
    },
    year: {
        type: Number
    },
    director: {
        type: String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    }
});
module.exports = mongoose.model('movies', movieSchema);
