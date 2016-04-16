"use strict";

var speech = require("../../node_modules/artyom.js/src/artyom.min.js");// eslint-disable-line no-unused-vars

var importFromTiled = require("splat-ecs/lib/import-from-tiled");
var map = require("../tiled/map.json");

module.exports = function(game) { // eslint-disable-line no-unused-vars
  importFromTiled(map, game.entities);
  game.scaleCanvasToFitRectangle(64,64);

};
