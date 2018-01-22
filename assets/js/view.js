'use strict'; 
const $ = require('jquery'); 
const tmdb = require('./tmdb');
const userData = require('./firebaseModel');
const auth = require("./user-factory");
const movieCard = require("./../templates/movieCard.hbs");

module.exports.showMovies = (moviesArr)=>{
  // clearMovies()
  $('#movieList > .row').html('');
  
  moviesArr.map(movie => {
    movie.release_date = movie.release_date.substring(0, 4);
    if(typeof movie.stars !== "undefined"){
      if(movie.stars >= 8){
        movie.class = "favorite";
      } else if(movie.stars === 0){
        movie.class = "wishlist";
      } else {
        movie.class = "watched";
      }
    }
    return movie;
  });

  moviesArr.forEach((movie, key) => {
    if (key < 6) {
      let actors;
      tmdb.getCast(movie.id)
         .then(cast => {
            actors = tmdb.makeCastList(cast).join(', ');
            $('#movieList > .row').append(movieCard({movie, actors}));
         });
      }
   });
};

module.exports.activateTab = (tab)=>{
   // changes class
};

const clearMovies=()=>{
   // clear dom
};