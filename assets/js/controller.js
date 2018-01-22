'use strict';
const $ = require('jquery');
const firebase = require("./fbConfig");
const auth = require("./user-factory");
const tmdb = require('./tmdb');
const view = require('./view');

// activates all listeners
module.exports.activateListeners = () => {
    activateAuthButton();
    activateLogoutButton();
    activateSearch();
};

// activate listener on logout button
const activateLogoutButton = () => {
    $('#logout-btn').click(() => {
        auth.logout();
    });
};

// activate listener on auth/login/register button
const activateAuthButton = () => {
    $('#auth-btn').click(() => {
        auth.authUser()
            .then(function (result) {
                auth.setActiveUser(result.user);
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMsg = error.message;
                alert(errorCode, errorMsg);
            });
    });
};

// activate listener on search bar (enter key press only)
    // populates resulting movie list
const activateSearch = () => {
    $('#searchBar').on('keypress', function (e) {
        if (e.keyCode === 13) {
            let search = $('#searchBar').val();
            tmdb.searchMovies(search)
                .then(list => {
                    view.showMovies(list);
                });
        }
    });
    
    $("#movieList").on("click", ".wish", function(e) {
      console.log($(e.target).parent());     
      // let currentUser = firebase.auth().currentUser;
      // let newMovie = {
      //   id: $(e.parent),
      //   uid: currentUser.uid
      // };
      // addTodo(todoObj).then(() => {
      //     displayTodos(todoObj.uid);
      // });
    });
};

