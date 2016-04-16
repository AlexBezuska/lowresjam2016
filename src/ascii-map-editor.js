"use strict";

module.exports = {
  "createLevel": function(game, levelgame, startPoint) {
    var start = {
      "x": 0,
      "y": 0
    };
    if (startPoint !== undefined) {
      if (typeof startPoint === "number") {
        console.log("startpoint is entity");
        start = game.entities.get(startPoint, "position");
      } else {
        start = startPoint;
      }
    }
    for (var i = 0; i < levelgame.length + 1; i++) {
      if (i === levelgame.length) {
        return;
      }
      for (var j = 0; j < levelgame[i].length; j++) {
        if (levelgame[i].charAt(j) === "0") {
          continue;
        }
        var newTile = game.instantiatePrefab(levelgame[i].charAt(j));

        var size = game.entities.get(newTile, "size");
        game.entities.set(newTile, "position", {
          "x": start.x + (size.width * j),
          "y": start.y + (size.height * i)
        });

      }
    }
  }
};
