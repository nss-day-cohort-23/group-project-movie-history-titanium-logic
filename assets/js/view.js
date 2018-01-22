'use strict'; 
const $ = require('jquery'); 
const tmdb = require('./tmdb');
const userData = require('./firebaseModel');
const auth = require("./user-factory");


module.exports.showMovies = (moviesArr)=>{
   // clearMovies()
   moviesArr.forEach(movie => {
      let actors;
      tmdb.getCast(movie.id)
         .then(cast=>{
            actors = tmdb.makeCastList(cast).join(', ');
            $('#movieOutput').append(`
               <div class='movieCards'>
               <h4 id="${movie.id}">${movie.title}</h4>
               <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
               <p>${actors}</p>
               <div>
            `);
         });
   });
};

module.exports.activateTab = (tab)=>{
   // changes class
};

const clearMovies=()=>{
   // clear dom
};