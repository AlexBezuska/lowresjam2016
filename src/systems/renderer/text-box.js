"use strict";

var tools = require("../../tools");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
    var textBox = game.entities.get(entity, "textBox");
    if (textBox.message.length > 0) {
      //viewport
      var viewPort = 1;
      var viewPortPosition = game.entities.get(viewPort, "position");
      var viewPortSize = game.entities.get(viewPort, "size");

      var size = game.entities.get(entity, "size");
      var position = game.entities.get(entity, "position");

      position.x = viewPortPosition.x;
      position.y = (viewPortPosition.y + viewPortSize.height) - size.height;

      context.fillStyle = textBox.fontColor;
      context.font = textBox.fontSize + "px " + textBox.font;
      tools.wrapText(
        context,
        textBox.message,
        Math.floor(position.x + size.padding),
        Math.floor(position.y + size.padding),
        size.width - size.padding,
        textBox.fontSize
      );
    }
  }, "textBox");
};
