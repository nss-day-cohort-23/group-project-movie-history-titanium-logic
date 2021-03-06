"use strict";
const $ = require("jquery");
const creds = require('./tmdbCreds');

module.exports.searchMovies = term => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${creds.tmdbKey}&query=${term}`
        })
        .done(data=>{
            resolve(data.results);
        });
    });
};

module.exports.getCast = movieId => {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${creds.tmdbKey}`
        })
        .done(data=>{
            resolve(makeCastList(data.cast));
        });
    });
};

const makeCastList = castArr =>{
    let actorNames = castArr.map(cast => cast.name);
    return actorNames.slice(0,3).join(", ");
};

module.exports.loadInfo = movie => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${creds.tmdbKey}`
        }).done(info => {
            movie.release_date = info.release_date;
            movie.title = info.title;
            movie.poster_path = info.poster_path;
            resolve(movie);
        })
        .fail(error => reject(error));
    });
};