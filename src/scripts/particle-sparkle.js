"use strict";

var particles = require("../particles");


module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

  var timers = game.entities.get(entity, "timers");
  if (timers.collect.running) {
    var sparkle = new particles.Config();
    sparkle.origin = {
      "x": middleCenterX(game, entity),
      "y": middleCenterY(game, entity)
    };
    sparkle.prefab = "sparkle";
    sparkle.qtyMin = 0;
    sparkle.qtyMax = 2;
    sparkle.angle = Math.PI;
    sparkle.arcWidth = Math.PI * 2;
    sparkle.sizeMin = 0.1;
    sparkle.sizeMax = 1.5;
    sparkle.velocityMin = -0.1;
    sparkle.velocityMax = 0.1;
    sparkle.lifeSpan = 500;
    particles.create(game, sparkle);
  }

};



function middleCenterX(game, entity) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(entity, "size");
  return position.x + (size.width / 2);
}

function middleCenterY(game, entity) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(entity, "size");
  return position.y + (size.height / 2);
}
