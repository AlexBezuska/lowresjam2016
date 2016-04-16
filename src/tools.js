"use strict";

module.exports = {
  "wrapText": function(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";

    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        context.textBaseline = "top";
        context.fillText(line, Math.floor(x), Math.floor(y));
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
};
