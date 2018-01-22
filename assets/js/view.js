'use strict';
const $ = require('jquery');
const tmdb = require('./tmdb');
const userData = require('./firebaseModel');
const auth = require("./user-factory");
const movieCard = require("./../templates/movieCard.hbs");

module.exports.showMovies = (moviesArr) => {
    clearMovies();

    moviesArr.map(movie => {
        movie.release_date = movie.release_date.substring(0, 4);
        if (typeof movie.stars !== "undefined") {
            if (movie.stars >= 8) {
                movie.class = "favorite";
            } else if (movie.stars === 0) {
                movie.class = "wishlist";
            } else {
                movie.class = "watched";
            }
        }
        return movie;
    });

    moviesArr.forEach((movie, key) => {
        if (key < 6) {
            tmdb.getCast(movie.id)
                .then(cast => {
                    movie.cast = cast;
                    $('#movieList > .row').append(movieCard({ movie }));
                });
        }
    });
};

const clearMovies = () => {
    $('#movieList > .row').html('');
};