"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars

  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var speed = 1;
    var position = game.entities.get(entity, "position");
    var timers = game.entities.get(entity, "timers");

    if (!timers.pause.running) {
      if (game.inputs.button("up")) {
        position.y -= speed;
        timers.pause.running = true;
      }
      if (game.inputs.button("left")) {
        position.x -= speed;
        timers.pause.running = true;
      }
      if (game.inputs.button("down")) {
        position.y += speed;
        timers.pause.running = true;
      }
      if (game.inputs.button("right")) {
        position.x += speed;
        timers.pause.running = true;
      }
    }

  }, "lowRezCharacterController");
};
