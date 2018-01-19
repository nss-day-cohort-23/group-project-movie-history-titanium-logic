"use strict";

const firebase = require("./fbConfig");
const $ = require("jquery");

// tested: works without uid
module.exports.getWishlist = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="dateWatched"&equalTo=null`
        }).done(wishlist => resolve(wishlist))
        .fail(error => reject(error));
    });
};

module.exports.getWatchedlist = (uid) => {
    // where dateWatched !== 0

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