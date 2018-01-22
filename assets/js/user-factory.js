"use strict";

const firebase = require("./fbConfig");

module.exports.authUser = () => {
   const provider = new firebase.auth.GoogleAuthProvider();

   return firebase
      .auth()
      .signInWithPopup(provider);
};

module.exports.logout = () => {
   return firebase.auth().signOut();
};