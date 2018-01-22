"use strict";

const $ = require("jquery");

const searchMovies = (term, limit) => {
    // promises a list of $limit movies based on response to following API call:
    //      https://developers.themoviedb.org/3/search/search-movies
};

const getCast = movieId => {
    // promises the cast for the movie with given id
    //      https://developers.themoviedb.org/3/credits/get-credit-details
};