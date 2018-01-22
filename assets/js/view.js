'use strict'; 
const $ = require('jquery'); 
const tmdb = require('./tmdb');
const userData = require('./firebaseModel');
const auth = require("./user-factory");


module.exports.showMovies = (moviesArr)=>{
   // clearMovies()
   $('#searchOutput').html('');
   
   moviesArr.forEach((movie, key) => {
     if (key < 6) {
      let actors;
      tmdb.getCast(movie.id)
         .then(cast=>{
            $('#searchOutput').append(`
            <div class="col s4 movieCards">
               <div class="card small horizontal">
                  <div class="card-image">
                     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                  </div>

                  <div class="card-stacked">
                     <div class="card-content">
                        <h5>${movie.title}</h5>
                        <p>2017</p>
                        <p>${cast}</p>
                     </div>
                     <div class="card-action center-align">
                        <a href="#" onclick="Materialize.toast('Added', 4000)" class="mr0"><i class="material-icons icon-blue">add</i></a>
                        <a href="#" class="mr0" onclick="Materialize.toast('Watched', 4000)"><i class="material-icons icon-blue">remove_red_eye</i></a>
                     </div>
                  </div>
               </div>
            </div>
            `);
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