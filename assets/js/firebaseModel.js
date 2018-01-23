"use strict";

const firebase = require("./fbConfig");
const $ = require("jquery");
const _ = require("lodash");

const fbURL = "https://titanium-logic.firebaseio.com";

// tested: works without uid
const getMovies = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched == null (isn't defined)
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="dateAdded"`
        }).done(movies => resolve(_.values(movies)))
        .fail(error => reject(error));
    });
};

// tested: works without uid
module.exports.getAllMovies = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched == null (isn't defined)
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="uid"&equalTo=${uid}`
        }).done(movies => resolve(movies))
        .fail(error => reject(error));
    });
};

module.exports.getMovieByIdAndUid = (id,uid)=>{
    return new Promise((resolve,reject)=>{
        module.exports.getMoviesById(id)
        .then((list)=>{
            resolve(_.findKey(list,['uid',uid]));
        });
    });
};

module.exports.rateMovie = (uid, movieId, stars) => {
    // determine number of filled stars for movie
};

module.exports.addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/movies.json`,
            method: "POST",
            data: JSON.stringify(newMovie)
        }).done(data => {
            resolve(data);
        });
    });
};

module.exports.deleteMovie = (uid, movieId) => {
    
};

module.exports.searchMovies = (term, uid) => {
    return new Promise((resolve, reject) => {
        getMovies(uid).then(movies => {
            let regex = new RegExp(term, "i");
            resolve(_.filter(movies, movie => regex.test(movie.title)));
        })
        .catch(error => reject(error));
    });
};

module.exports.getMovies = getMovies;