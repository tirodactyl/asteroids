(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)]);
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 60;

  Game.prototype.addAsteroids = function (num) {
    var asteroids = [];
    for (var i = 0; i < num; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      asteroids.push(asteroid);
    }

    return asteroids;
  };

  Game.prototype.draw = function () {
    var ctx = this.ctx;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // gotta fix this
    this.ctx.setFillColor('black');

    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ship.draw(ctx);
    this.asteroids.forEach(function (asteroid){
      asteroid.draw(ctx);
    });
  };

  Game.prototype.move = function () {
    this.ship.move();
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.step = function () {
    this.move();
    this.checkAsteroids();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.checkAsteroids = function () {
    var game = this;
    var outOfBounds = [];

    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i];
      if (asteroid.pos[0] < (0 - asteroid.radius) ||
          asteroid.pos[0] > (Game.DIM_X + asteroid.radius) ||
          asteroid.pos[1] < (0 - asteroid.radius) ||
          asteroid.pos[1] > (Game.DIM_Y + asteroid.radius)) {
            outOfBounds.push(i);
          }
    }

    outOfBounds = outOfBounds.sort(function(a, b) {
      return b - a;
    });

    for (var i = 0; i < outOfBounds.length; i++) {
      this.asteroids.splice(outOfBounds[i], 1);
    }
  };

  Game.prototype.start = function () {
    var game = this;
    game.bindKeyHandlers();
    this.intervalID = window.setInterval( function () {
        game.step();
      }, Game.FPS);
  };

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalID);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.asteroids.forEach (function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        game.stop();
        window.alert("Alderaan's revenge!");
      }
    });
  };

  Game.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    key('w', function(){
      ship.power(2);
    });

    key('a', function(){
      ship.shiftDir(-1);
    });

    key('s', function(){
      ship.power(-2);
    });

    key('d', function(){
      ship.shiftDir(1);
    });
  };

})(this);