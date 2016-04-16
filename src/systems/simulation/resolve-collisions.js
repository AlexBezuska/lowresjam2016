"use strict";

function wasLeft(lastPosition, size, otherPosition) {
  return lastPosition.x + size.width <= otherPosition.x;
}
function wasRight(lastPosition, otherPosition, otherSize) {
  return lastPosition.x >= otherPosition.x + otherSize.width;
}
function wasAbove(lastPosition, size, otherPosition) {
  return lastPosition.y + size.height <= otherPosition.y;
}
function wasBelow(lastPosition, otherPosition, otherSize) {
  return lastPosition.y >= otherPosition.y + otherSize.height;
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("resolveCollisionsSearch", ["collisions","velocity","lastPosition","position"]);
  ecs.addEach(function resolveCollisions(entity, elapsed) { // eslint-disable-line no-unused-vars
    var collisions = game.entities.get(entity, "collisions");
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var velocity = game.entities.get(entity, "velocity");
    var lastPosition = game.entities.get(entity, "lastPosition");

    for (var i = 0; i < collisions.length; i++) {
      var other = collisions[i];

      if (game.entities.get(other, "obstacle")) {

        var otherPosition = game.entities.get(other, "position");
        var otherSize = game.entities.get(other, "size");

        if (wasLeft(lastPosition, size, otherPosition)) {
          position.x = otherPosition.x - size.width - 1;
          velocity.x = 0;
        }
        if (wasRight(lastPosition, otherPosition, otherSize)) {
          position.x = otherPosition.x + otherSize.width + 1;
          velocity.x = 0;
        }
        if (wasAbove(lastPosition, size, otherPosition)) {
          position.y = otherPosition.y - size.height - 1;
          velocity.y = 0;
        }
        if (wasBelow(lastPosition, otherPosition, otherSize)) {
          position.y = otherPosition.y + otherSize.height + 1;
          velocity.y = 0;
        }
      }
    }
  }, "resolveCollisionsSearch");
};
