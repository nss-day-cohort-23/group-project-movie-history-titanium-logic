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
module.exports.showMovies = (moviesArr)=>{
  clearMovies();

  moviesArr.map(movie => {
    movie.release_date = movie.release_date.substring(0, 4);
    
    movie = module.exports.addDetails(movie);

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


module.exports.rePrintMovie = (movie) => {
  let $controls = $(`div[data-movieid='${movie.id}']`);
  $controls.parents(".movieParent").attr("class", `movieParent col s12 m6 ${movie.class}`);
  $controls.replaceWith(movieControls(movie));
};