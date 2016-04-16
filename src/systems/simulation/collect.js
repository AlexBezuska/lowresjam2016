"use strict";
var speech = require("../../speech");
var random = require("splat-ecs/lib/random");
var camera = 0;
//var briefcase = 4;
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function resolveCollisions(entity, elapsed) { // eslint-disable-line no-unused-vars



    var collisions = game.entities.get(entity, "collisions");
    //var position = game.entities.get(entity, "position");
    //var size = game.entities.get(entity, "size");

    //var lastPosition = game.entities.get(entity, "lastPosition");

    for (var i = 0; i < collisions.length; i++) {
      var other = collisions[i];
      if (game.entities.get(other, "collectable")) {

        var otherCollectable = game.entities.get(other, "collectable");

        var points = game.entities.get(entity, "points");
        game.entities.set(entity, "points", points + otherCollectable.points);
        var briefCaseScale = game.entities.get(4, "scale");
        briefCaseScale.current = briefCaseScale.current + 0.1;

        // effects
        game.entities.set(camera, "shake", { "magnitude": 4, "duration": 180 });
        //game.entities.set(briefcase, "shake", { "magnitude": 8, "duration": 450 });
        game.entities.get(entity, "timers").collect.running = true;
        game.sounds.play(random.from(["collect-1.wav", "collect-2.wav", "collect-3.wav", "collect-4.wav"]));

        var defendants = game.entities.get(entity, "points");
        var message = "";
        if (defendants < 2) {
          message = "defendant. Just getting started, and the court opens soon!";
        } else if (defendants < 21) {
          message = "defendants.";
        } else {
          message = "defendants, I need to get to the courthouse!";
        }
//" I am Samuel spider, PHD attourney of insect law"
        speech.stop();
        speech.say(defendants + message);


        // remove collectable
        game.entities.destroy(other);
      }
    }
  }, "points");
};
