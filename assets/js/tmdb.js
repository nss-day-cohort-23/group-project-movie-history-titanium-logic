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
            resolve(data.cast);
        });
    });
};

module.exports.makeCastList = castArr =>{
    let actors = [];
    for(let i=0;i<castArr.length;i++){
        actors.push(castArr[i].name);
    }
    return actors;
};

