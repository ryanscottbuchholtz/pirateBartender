require("../css/normalize.css");
require("../css/style.less");
require("font-awesome-webpack");

var $ = require('jquery');


var functions = require('./functions');


$(document).ready( function() {
  functions.hideStackedElements();
  functions.askQuestion();
  functions.checkResponse();
  functions.orderAnother();
});


