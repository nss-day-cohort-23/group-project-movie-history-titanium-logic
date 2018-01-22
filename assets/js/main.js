"use strict";

// const tmdb = require("./tmdb");
const firebaseModel = require("./firebaseModel");

// tmdb.searchMovies("pacific").then(movies => console.log(movies));

firebaseModel.getWishlist("").then(wishlist => console.log(wishlist));
firebaseModel.getWatchedlist("").then(watchedList => console.log(watchedList));