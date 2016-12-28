var mongoose = require('mongoose');
var Movie = require('../models/movies');
var q = require('q');
var request = require('request');
var NodeGeocoder = require('node-geocoder');

var util = require('./../utility/utils');

var options = {
    provider: 'google',
};
var geocoder = NodeGeocoder(options);

module.exports.getlistMovies = function(req, res) {
    var message;
    var reg = req.params.query.toLowerCase();
    Movie.find({
        "name": {
            "$regex": reg,
            "$options": "i"
        }
    }).limit(20).exec(function(err, resp) {
        if (err) return res.send(util.createMessage(500));
        return res.send(resp);

    });
}

module.exports.getMoviesId = function(req, res) {
    var defer = q.defer();
    var reg = req.params.query;
    console.log(reg);
    Movie.find({
        "name": {
            "$regex": reg,
            "$options": "i"
        }
    }).exec(function(err, resp) {
        if (err) {
            message = util.createMessage(500);
            return res.send(message)
        };
        if (resp && resp.constructor === Array && resp.length) {
            var mappedPromise = [];
            resp.forEach(function(singleData) {
                if (singleData.location) {
                    var deferred = q.defer();
                    var promise = geocoder.geocode(singleData.location)
                        .then(function(data) {
                            if (!(data && data.constructor === Array && data.length)) {
                                var data = [];
                                var temp = {
                                    latitude: null,
                                    longitude: null
                                }
                                data.push(temp);
                            }
                            singleData.latitude = data[0].latitude;
                            singleData.longitude = data[0].longitude;
                            deferred.resolve(singleData);
                        });
                    mappedPromise.push(deferred.promise);
                }
            })
            q.all(mappedPromise)
                .then(function(response) {
                    return res.send(util.createMessage(200, response));
                })
                .catch(function(err) {
                    return res.send(util.createMessage(500));
                });
        }
    });
}
