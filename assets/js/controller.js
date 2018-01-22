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


    $('#searchBar').on('keypress', function (e) {
        if (e.keyCode === 13) {
            let search = $('#searchBar').val();
            tmdb.searchMovies(search)
                .then(list => {
                    view.showMovies(list);
                });
        }
    });

};

$("addToWish").click(function(e) {
  console.log(e);
});


const activateSearch = () => {
    // on enter listener
};

