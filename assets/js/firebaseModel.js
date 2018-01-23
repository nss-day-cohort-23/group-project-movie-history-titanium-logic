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

module.exports.deleteMovie = (key) => {
    return new Promise((resolve, reject) => {
        $.ajax({
          url: `${fbURL}/movies/${key}/.json`,
          method: "DELETE"
        })
        .done(data => {
            resolve(data);
            console.log("deleted");
        })
        .fail(error => {
            console.log(error.statusText);
            reject(error);
        });
      });
    };

module.exports.searchMovies = (uid, term) => {
    return new Promise((resolve, reject) => {
        getMovies(uid).then(movies => {
            let regex = new RegExp(term, "i");
            resolve(movies.filter(movie => regex.test(movie.title)));
        })
        .catch(error => reject(error));
    });
};

module.exports.getMovies = getMovies;