"use strict";

//var speech = require("../speech.js");// eslint-disable-line no-unused-vars
var speech = require("../../node_modules/artyom.js/src/artyom.min.js");// eslint-disable-line no-unused-vars

var settings = {
  continuous: true,
  onResult: function(text) {
    results.push(text);
  },
  onStart: function() {
    console.log("START LISTENING");
  },
  onEnd: function() {
    var fullMessage = results[results.length - 1];
    console.log(fullMessage);
    var matches = getMatch(keywords, fullMessage.split(" "));
    console.log(matches);
    var verdict = "";
    if (matches.length < 1) {
      verdict = "hum, let's see here";
    } else if (matches.length > 5) {
      verdict = "outstanding case! Great job Samuel.";
    } else if (matches.length > 3) {
      verdict = "We shall see what the jury has to say after massive deliberations...";
    }
    artyom.say("Order in the court!" + verdict);
  }
};

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.sounds.play("gavel.mp3");
  //speech.say("Order in the court!");
  if (game.inputs.buttonPressed("start")) {
    UserDictation.start();
  }

  if (game.inputs.buttonPressed("end")) {
    UserDictation.stop();
  }

};

var keywords = [
  "honor",
  "bugs",
  "bug",
  "insect",
  "bath",
  "tub",
  "bathtub",
  "punitive",
  "damages",
  "awarded",
  "plea",
  "section",
  "disenfranchised"
];

function getMatch(a, b) {
  var matches = [];

  for (var i = 0; i < a.length; i++) {
    for (var e = 0; e < b.length; e++) {
      if (a[i] === b[e]) matches.push(a[i]);
    }
  }
  return matches;
}

var results = [];

var UserDictation = artyom.newDictation(settings);
