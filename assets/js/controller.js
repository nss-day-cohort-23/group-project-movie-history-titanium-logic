'use strict';
const $ = require('jquery');
const firebase = require("./fbConfig");
const auth = require("./user-factory");
const tmdb = require('./tmdb');
const view = require('./view');

module.exports.activateListeners = () => {

  $('#auth-btn').click(() => {
    auth.authUser()
      .then(function (result) {
        console.log('user', result);
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMsg = error.message;
        alert(errorCode, errorMsg);
      });
  });


  $('#logout-btn').click(() => {
    auth.logout();
  });


  $('#searchInput').on('keypress', function(e){
    if(e.keyCode === 13){
      let search = $('#searchInput').val();
      tmdb.searchMovies(search)
      .then(list=>{
        view.showMovies(list);
      });
    }
  });

};


const activateSearch = () => {
  // checks active tab in listener
  // on enter listener
};

const switchTabs = tab => {
  // search: clear
  // lists: grab recent
};

