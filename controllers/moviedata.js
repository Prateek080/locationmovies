var mongoose = require('mongoose');
var q = require('q');
var request = require('request');

var Movie = require('../models/movies');
var util = require('./../utility/utils');
;


var insertData = function(val, defer) {
    var insertionData = {
        'name': val[8],
        'year': val[9],
        'location': val[10],
        'production': val[12],
        'director': val[14]
    }
    var temploc = (insertionData.location) ? insertionData.location : '';
    if (temploc.indexOf('(') > -1) {
        temploc = temploc.split('(')[1];
        temploc = temploc.split(')')[0];
    }
    var neMovie = new Movie(insertionData);
    neMovie.save().then(function(data) {
            console.log(data, 'hun');
            defer.resolve(data);
        })
        .catch(function(err) {
            console.log(err);
            defer.reject(err);
        });

}

var getMovies = function(req, res, done) {
    var defer = q.defer();
    request("http://localhost:3000/movieslocations.json", function(error, response) {
        if (error) {
            console.log(error);
        } else {
            var dataset;
            try {
                dataset = JSON.parse(response.body);
            } catch (e) {
                dataset = {};
            }
            // insertData(dataset.data[0], defer);
            dataset.data.forEach(function(val) {
                insertData(val, defer)
            })
        }
    });
    return defer.promise;
}

module.exports.getMovies = getMovies;
