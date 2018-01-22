"use strict";

const firebase = require("./fbConfig");
const $ = require("jquery");

// tested: works without uid
module.exports.getWishlist = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched == null (isn't defined)
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="dateWatched"&equalTo=null`
        }).done(wishlist => resolve(wishlist))
        .fail(error => reject(error));
    });
};

// tested: works without uid
module.exports.getWatchedlist = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched >= 1
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="dateWatched"&startAt=1`
        }).done(watchedList => resolve(watchedList))
        .fail(error => reject(error));
    });
};

module.exports.rateMovie = (uid, movieId, stars) => {
    
};

module.exports.addMovie = (uid, movieId, date) => {
    
};

module.exports.watchMovie = (uid, movieId, date) => {
    
};

module.exports.deleteMovie = (uid, movieId) => {
    
};

module.exports.searchWishlist = (uid, term) => {
    
};

module.exports.searchWatched = (uid, term) => {
    
};