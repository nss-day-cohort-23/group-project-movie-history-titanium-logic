"use strict";

const $ = require("jquery");
const tmdbCreds = require("./tmdbCreds");

// promises list of movies matching the TMDb search `${term}`
const searchMovies = term => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${tmdbCreds.tmdbKey}&language=en-US&query=${term}&page=1&include_adult=false`
        }).done(movies => resolve(movies))
        .fail(error => reject(error));
    });
};

const getCast = movieId => {
    // promises the cast for the movie with given id
    //      https://developers.themoviedb.org/3/credits/get-credit-details
};

module.exports = {searchMovies};