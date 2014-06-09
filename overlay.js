(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Overlay = Asteroids.Overlay = function (type) {
    this.type = this[type];
  };
  
  Overlay.prototype.main = {
    settings: function (ctx) {
      ctx.textAlign = 'center'
      ctx.setFillColor('yellow');
    },
    lines: [
      {
        font: '40pt sans-serif',
        text: 'ASTEROIDS',
        x: 250,
        y: 200
      },
      {
        font: '18pt sans-serif',
        text: '[w][a][s][d] to move the ship; [space] to fire',
        x: 250,
        y: 300
      }
    ]
  };
  
  Overlay.prototype.level = {
    settings: function (ctx) {
      ctx.textAlign = 'center'
      ctx.setFillColor('yellow');
    },
    lines: [
      {
        font: '18pt sans-serif',
        text: 'level complete!',
        x: 250,
        y: 220
      },
      {
        font: '18pt sans-serif',
        text: 'get ready for the next wave!',
        x: 250,
        y: 260
      }
    ]
  };
  
  Overlay.prototype.draw = function (ctx) {
    ctx.save();
    if (this.type.settings) { this.type.settings(ctx); }
    _.each(this.type.lines, function (line) {
      
      if (line.font) { ctx.font = line.font; }
      ctx.fillText(line.text, line.x, line.y);
    });
    ctx.restore();
  };
  
})(this);