"use strict";

const fbCreds = require("./fbCreds");

const firebase = require("firebase");
require("firebase/auth");

const config = {
    apiKey: fbCreds.apiKey,
    authDomain: fbCreds.authDomain
};

firebase.initializeApp(config);

module.exports = firebase;