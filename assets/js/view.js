'use strict';
const $ = require('jquery');
const tmdb = require('./tmdb');
const userData = require('./firebaseModel');
const auth = require("./user-factory");
const movieCard = require("./../templates/movieCard.hbs");
const movieControls = require("./../templates/controls.hbs");
const firebase = require("firebase");

module.exports.checkLogin = () => {
    // Listen to if the user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { // User is logged   in
        $("#auth-btn").hide();
        $("#logout-btn").show();
      } else { // No user is logged in
        $("#logout-btn").hide();
        $("#auth-btn").show();
      }
    });
  };


module.exports.addDetails = (movie) => {

  if(typeof movie.stars !== "undefined"){
    if(movie.stars >= 8){
      movie.class = "favorite";
    } else if(movie.stars === 0){
      movie.class = "wishlist";
    } else {
      movie.class = "watched";
    }

    // Add  objects for handelbars to loop over to know the count.  Handlebars does not have a for loop, but it does have foreach.

    let movieStars = [];
    for(let i = 0; i < 10; i++){ 
      if(i < movie.stars){
        movieStars.push({star: true});
      } else {
        movieStars.push({});
      }
    }
    movie.stars = movieStars;

  }

  return movie;
};

// Add  objects for handelbars to loop over to know the count.  Handlebars does not have a for loop, but it does have foreach.

module.exports.showMovies = (moviesArr) => {
    clearMovies();

    moviesArr.map(movie => {
        movie.release_date = movie.release_date.substring(0, 4);
        movie.starsCount = movie.stars;
        
        if (typeof movie.stars !== "undefined") {
            if (movie.stars >= 8) {
                movie.class = "favorite";
            } else if (movie.stars === 0) {
                movie.class = "wishlist";
            } else {
                movie.class = "watched";
            }            let movieStars = [];
            for (let i = 0; i < 10; i++) {
                if (i < movie.stars) {
                    movieStars.push({ star: true });
                } else {
                    movieStars.push({});
                }
            }
            movie.stars = movieStars;

        } else {
            movie.class = "tmdb";
        }
        return movie;
    });

    // adds movies in order of search, not promise fulfillment
    let castPromises = moviesArr.map(movie => {
        return tmdb.getCast(movie.id);
    });
    Promise.all(castPromises).then(casts => {
        moviesArr.forEach((movie, index) => {
            movie.cast = casts[index];
            $('#movieList > .row').append(movieCard({ movie }));
        });
    });
};

const clearMovies = () => {
    $('#movieList > .row').html('');
};


module.exports.rePrintMovie = (movie) => {
  let $controls = $(`div[data-movieid='${movie.id}']`);
  $controls.parents(".movieParent").attr("class", `movieParent col s12 m6 ${movie.class}`);
  $controls.replaceWith(movieControls(movie));
};