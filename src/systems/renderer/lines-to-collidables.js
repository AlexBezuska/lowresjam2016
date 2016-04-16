"use strict";

var camera = 0;
var viewPort = 1;
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("linesToCollidablesSearch", ["collisions", "position", "size"]);
  ecs.add(function linesToCollidables(entities, context) {
    var collidables = game.entities.find("collisions");

    var cp = game.entities.get(camera, "position");
    var vp = game.entities.get(viewPort, "position");
    var vs = game.entities.get(viewPort, "size");

    var viewPortLines = {
      "top": {
        "sx": vp.x - cp.x,
        "sy": vp.y - cp.y,
        "ex": (vp.x + vs.width) - cp.x,
        "ey": vp.y  - cp.y
      },
      "right": {
        "sx": (vp.x + vs.width) - cp.x,
        "sy": vp.y - cp.y,
        "ex": (vp.x + vs.width) - cp.x,
        "ey": (vp.y + vs.height) - cp.y
      },
      "bottom": {
        "sx": vp.x - cp.x,
        "sy": (vp.y + vs.height) - cp.y,
        "ex": (vp.x + vs.width) - cp.x,
        "ey": (vp.y + vs.height) - cp.y
      },
      "left": {
        "sx": vp.x - cp.x,
        "sy": vp.y - cp.y,
        "ex": vp.x - cp.x,
        "ey": (vp.y + vs.height) - cp.y
      }
    };

    // drawLineObject(context, viewPortLines.top, "yellow");
    // drawLineObject(context, viewPortLines.right, "red");
    // drawLineObject(context, viewPortLines.bottom, "green");
    // drawLineObject(context, viewPortLines.left, "blue");


    for (var i = 0; i < collidables.length; i++) {
      if (game.entities.get(collidables[i], "collectable")) {
        var currentLine = returnLineBetweenEntities(game, camera, viewPort, collidables[i]);
        var intersect = {
          "top": checkLineIntersection(currentLine, viewPortLines.top),
          "right": checkLineIntersection(currentLine, viewPortLines.right),
          "bottom": checkLineIntersection(currentLine, viewPortLines.bottom),
          "left": checkLineIntersection(currentLine, viewPortLines.left)
        };
        var boxSize = 2;
        context.fillStyle = "green";
        if (intersect.top.onLine1 && intersect.top.onLine2) {
          // prefab.image.name = "arrowUp.png";

          context.fillRect(Math.floor(intersect.top.x), Math.floor(intersect.top.y), boxSize, boxSize);
        } else if (intersect.right.onLine1 && intersect.right.onLine2) {
          // prefab.image.name = "arrowRight.png";
          //context.fillStyle = "red";
          context.fillRect(Math.floor(intersect.right.x) - boxSize, Math.floor(intersect.right.y) - (boxSize / 2), boxSize, boxSize);
        } else if (intersect.bottom.onLine1 && intersect.bottom.onLine2) {
          // prefab.image.name = "arrowDown.png";
          //context.fillStyle = "green";
          context.fillRect(Math.floor(intersect.bottom.x) - (boxSize / 2), Math.floor(intersect.bottom.y) - boxSize, boxSize, boxSize);
        } else if (intersect.left.onLine1 && intersect.left.onLine2) {
          // prefab.image.name = "arrowLeft.png";
          //context.fillStyle = "blue";
          context.fillRect(Math.floor(intersect.left.x), Math.floor(intersect.left.y) + boxSize, boxSize, boxSize);
        }
        //draw_line(game, context, 0, viewPort, collidables[i], "rgba(255,255,255,1)");
      }
    }
  }, "linesToCollidablesSearch");
};

function returnLineBetweenEntities(game, camera, entity1, entity2) {
  var cp = game.entities.get(camera, "position");
  var s1 = game.entities.get(entity1, "size");
  var s2 = game.entities.get(entity2, "size");
  var p1 = game.entities.get(entity1, "position");
  var p2 = game.entities.get(entity2, "position");
  if (entity1 && entity2) {
    return {
      "sx": (p1.x - cp.x) + s1.width / 2,
      "sy": (p1.y - cp.y) + s1.height / 2,
      "ex": (p2.x - cp.x) + s2.width / 2,
      "ey": (p2.y - cp.y) + s2.height / 2
    };
  }
}

function checkLineIntersection(line1, line2) {
  var line1StartX = line1.sx;
  var line1StartY = line1.sy;
  var line1EndX = line1.ex;
  var line1EndY = line1.ey;
  var line2StartX = line2.sx;
  var line2StartY = line2.sy;
  var line2EndX = line2.ex;
  var line2EndY = line2.ey;
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  var denominator, a, b, numerator1, numerator2,     result = {
      x: null,
      y: null,
      onLine1: false,
      onLine2: false
    };
  denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
  if (denominator == 0) {
    return result;
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
  numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + (a * (line1EndX - line1StartX));
  result.y = line1StartY + (a * (line1EndY - line1StartY));
  /*
  // it is worth noting that this should be the same as:
  x = line2StartX + (b * (line2EndX - line2StartX));
  y = line2StartX + (b * (line2EndY - line2StartY));
  */
  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a > 0 && a < 1) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b > 0 && b < 1) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are true
  return result;
}
