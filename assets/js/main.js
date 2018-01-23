"use strict";
const $ = require('jquery'); 
const controller = require('./controller');
const fbModel = require('./firebaseModel');


controller.activateListeners();

$('#rateMe').click(function(){
   fbModel.rateMovie(0,68726,3);
});

