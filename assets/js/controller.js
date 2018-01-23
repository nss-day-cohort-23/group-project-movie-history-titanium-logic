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
    
    activateStars();
};

const activateTabs = () => {
  $("#show-all").on("click", event => {
      $("#movieList > .row > .col").show();
  });
  $("#show-wishlist").on("click", event => {
      $("#movieList > .row > .col").hide();
      $("#movieList > .row > .wishlist").show();
  });
  $("#show-watched").on("click", event => {
      $("#movieList > .row > .col").hide();
      $("#movieList > .row > .watched").show();
  });
  $("#show-favorite").on("click", event => {
      $("#movieList > .row > .col").hide();
      $("#movieList > .row > .favorite").show();
  });
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
    
    $("#movieList").on("click", ".wish", function(e) {     
      // let currentUser = firebase.auth().currentUser;
      let newMovie = {
        id: $(e.target).parent().data("movieid"),
        title: $(e.target).parent().prev().find("h5").text(),
        stars: 0
      };

      fbModel.addMovie(newMovie).then(movie => {
          console.log(movie);
          newMovie = view.addDetails(newMovie);
          view.rePrintMovie(newMovie);
      });
    });
  




//     $("#movieList").on("click", ".star", function (e) {
//         // console.log($(this).data('data-starid'));
//     });
// };


    // $("#movieList").on("click", ".deleter", function() {     
      // let movieId = $(e.target).parent().data("movieid");
      // let key = 
      // fbModel.deleteMovie(key)
      // .then(() => {
      //    // update class of movie to tmdb from wished
      // });
  // });
// };

const activateTabs = () => {
    $("#show-all").on("click", event => {
        $("#movieList > .row > .col").show();
    });
    $("#show-wishlist").on("click", event => {
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .wishlist").show();
    });
    $("#show-watched").on("click", event => {
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .watched").show();
    });
    $("#show-favorite").on("click", event => {
        $("#movieList > .row > .col").hide();
        $("#movieList > .row > .favorite").show();
    });
};

const activateStars = () => {
    $("#movieList").on("mouseenter", ".star-wrapper", function(){
        $(this).prevAll().children(".material-icons").text("star");
        $(this).nextAll().children(".material-icons").text("star_border");
    });
    
    $("#movieList").on("mouseleave", ".stars-wrapper", function(){
        console.log("out");
        let  $starsWrapper = $(this);
        console.log('$starsWrapper', $starsWrapper);
        $(this).children(".material-icons").each(function( index ) {
            if(index <  $starsWrapper.data("originalStars")){
                $(this).text('star');
            }
          });
    });
};

