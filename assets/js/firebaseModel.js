"use strict";

const firebase = require("./fbConfig");
const $ = require("jquery");

const fbURL = "https://titanium-logic.firebaseio.com";

// tested: works without uid
module.exports.getMovies = (uid) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched == null (isn't defined)
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="dateAdded"`
        }).done(wishlist => resolve(wishlist))
        .fail(error => reject(error));
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
          }).done(() => {
            resolve();
          });
        });
};

module.exports.deleteMovie = (uid, movieId) => {
    
};

module.exports.search = (uid, term) => {
    
};