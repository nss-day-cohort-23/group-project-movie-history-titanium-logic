"use strict";

const firebase = require("./fbConfig");
const $ = require("jquery");
const _ = require('lodash');

const fbURL = "https://titanium-logic.firebaseio.com";

// tested: works without uid
module.exports.getMoviesById = (id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            // dateWatched == null (isn't defined)
            url: `https://titanium-logic.firebaseio.com/movies.json?orderBy="id"&equalTo=${id}`
        }).done(wishlist => resolve(wishlist))
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
    let rating = {"stars":stars};
    module.exports.getMovieByIdAndUid(movieId, uid)
    .then((key)=>{
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${fbURL}/movies/${key}.json`,
                method: "PATCH",
                data: JSON.stringify(rating)
            }).done(() => {
                resolve();
            });
        }); 
    });
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

module.exports.searchMovies = (uid, term) => {
    return new Promise((resolve, reject) => {
        module.exports.getMoviesById(uid).then(movies => {
            let regex = new RegExp(term, "i");
            resolve(movies.filter(movie => regex.test(movie.title)));
        })
        .catch(error => reject(error));
    });
};
