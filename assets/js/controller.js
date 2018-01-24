'use strict';
const $ = require('jquery');
const firebase = require("./fbConfig");
const auth = require("./user-factory");
const tmdb = require('./tmdb');
const view = require('./view');
const fbModel = require('./firebaseModel');

// activates all listeners
module.exports.activateListeners = () => {
    activateAuthButton();
    activateLogoutButton();
    activateSearch();
    view.checkLogin();
    activateTabs();
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

const searchAllMovies = (term, uid) => {
    return new Promise((resolve, reject) => {
        tmdb.searchMovies(term).then(tmdbMovies => {
            fbModel.searchMovies(term, uid).then(fbMovies => {
                let promises = fbMovies.map(movie => {
                    return tmdb.loadInfo(movie);
                });
                Promise.all(promises).then(fbMovies => {
                    // returns fbMovies first, then tmdbMovies, in same array
                    resolve(fbMovies.concat(tmdbMovies));
                });
            }).catch(error => reject(error));
        });
    });
};

// activate listener on search bar (enter key press only)
// populates resulting movie list
const activateSearch = () => {
    $('#searchBar').on('keypress', function (e) {
        if (e.keyCode === 13) {
            let search = $('#searchBar').val();
            // need to get uid too
            searchAllMovies(search, 0)
                .then(list => {
                    view.showMovies(list);
                });
        }
    });

    $("#movieList").on("click", ".wish", function (e) {
        // let currentUser = firebase.auth().currentUser;
        let newMovie = {
            id: $(e.target).parent().data("movieid"),
            title: $(e.target).parent().prev().find("h5").text(),
            stars: 0,
            uid: firebase.auth().currentUser.uid,
        };

        fbModel.addMovie(newMovie).then(movie => {
            newMovie = view.addDetails(newMovie);
            view.rePrintMovie(newMovie);
        });
    });
};

let getUserMovies = (uid) => {
    fbModel.getAllMovies(uid)
        .then((movieArr) => {
            let fbKeys = Object.keys(movieArr);
            let fbArr = [];
            fbKeys.forEach((key) => {
                let movieInfoArr = [];
                tmdb.loadInfo(movieArr[[key]])
                    .then(movieInfo => {
                        movieInfoArr.push(movieInfo);
                        view.showMovies(movieInfoArr);
                    });
            });
            view.showMovies(fbArr);
        });
};

const activateTabs = () => {
    $("#show-all").on("click", event => {
        let search = $('#searchBar').val();
        if (search === '') {
            $("#movieList > .row > .wishlist").empty();
        }
        $("#movieList > .row > .col").show();
    });

    $("#show-wishlist").on("click", event => {
        let search = $('#searchBar').val();
        if (search === '') {
            $("#movieList > .row > .wishlist").empty();
            getUserMovies(firebase.auth().currentUser.uid);
        }
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .wishlist").show();
    });

    $("#show-watched").on("click", event => {
        let search = $('#searchBar').val();
        if (search === '') {
            $("#movieList > .row > .wishlist").empty();
        }
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .watched").show();
    });
    
    $("#show-favorite").on("click", event => {
        let search = $('#searchBar').val();
        if (search === '') {
            $("#movieList > .row > .wishlist").empty();
        }
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .favorite").show();
    });
};