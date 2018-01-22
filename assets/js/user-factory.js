"use strict";

const firebase = require("./fbConfig");
let activeUser;

module.exports.authUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(provider);
};

module.exports.logout = () => {
    return firebase.auth().signOut();
};

module.exports.setActiveUser = user => {
    activeUser = user;
};

module.exports.getActiveUser = () => activeUser;