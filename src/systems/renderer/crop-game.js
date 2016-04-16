"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
    var viewportPosition = game.entities.get(entity, "position");
    var viewportSize = game.entities.get(entity, "size");

    var cameraPosition = game.entities.get(0, "position");
    var cameraSize = game.entities.get(0, "size");

    context.fillStyle = "black";
    context.fillRect(
      cameraPosition.x - 1,
      cameraPosition.y - 1,
      cameraSize.width  + 2,
      (viewportPosition.y - cameraPosition.y) + 2
    );

    var uh = (viewportPosition.x + viewportSize.width) + cameraSize.width;
    if (uh < cameraSize.width) {
      uh = (uh * -1) + cameraSize.width;
    }

    //context.fillStyle = "red";
    context.fillRect(
      viewportPosition.x + viewportSize.width,
      cameraPosition.y - 1,
      uh,
      cameraSize.height + 1
    );

    var hey = (viewportPosition.y + viewportSize.height) - cameraSize.height;
    if (hey < cameraSize.height) {
      hey = (hey * -1) + cameraSize.height;
    }

    //context.fillStyle = "blue";
    context.fillRect(
      cameraPosition.x - 1,
      viewportSize.height + viewportPosition.y - 1,
      cameraSize.width + 1,
      hey + 1
    );

    var what = viewportPosition.x - cameraPosition.x;
    if (what < cameraSize.width) {
      what = (what * -1) + cameraSize.width;
    }

    //context.fillStyle = "yellow";
    context.fillRect(
      cameraPosition.x - 1,
      cameraPosition.y - 1,
      viewportPosition.x - cameraPosition.x + 1,
      cameraSize.height + 1
    );

  }, "viewPort");
};
