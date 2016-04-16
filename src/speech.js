"use strict";


var speech = require("../node_modules/artyom.js/src/artyom.min.js");// eslint-disable-line no-unused-vars



module.exports = {
  "say": function(message) {
    artyom.say(message);
  },
  "stop": function() {
    artyom.shutUp();
  }
};
