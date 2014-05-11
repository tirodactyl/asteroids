(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)]);
    this.bullets = [];
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.FPS = 50; //actually represents ms between redraws

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
    this.bullets.forEach(function (bullet){
      bullet.draw(ctx);
    });
    this.asteroids.forEach(function (asteroid){
      asteroid.draw(ctx);
    });
  };

  Game.prototype.move = function () {
    this.ship.move();
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
    this.bullets.forEach(function (bullet) {
      bullet.move();
    });
  };

  Game.prototype.step = function () {
    this.move();
    this.checkAsteroids();
    this.draw();
    this.checkCollisions();
  };
  
  Game.prototype.outOfBounds = function (object) {
    if (object.pos[0] < (0 - object.radius) ||
        object.pos[0] > (Game.DIM_X + object.radius) ||
        object.pos[1] < (0 - object.radius) ||
        object.pos[1] > (Game.DIM_Y + object.radius)) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.checkAsteroids = function () {
    var game = this;
    var toRemove = [];

    this.asteroids.forEach(function (asteroid) {
      if (game.outOfBounds(asteroid)) {
        toRemove.push(asteroid);
      }
    });

    toRemove.forEach(function (asteroid) {
      game.removeAsteroid(asteroid);
    });
  };
  
  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids = _.reject(this.asteroids, function (item) {
      return item.pos === asteroid.pos;
    });
  };
  
  Game.prototype.removeBullet = function (bullet) {
    this.bullets = _.reject(this.bullets, function (item) {
      return item.pos === bullet.pos;
    });
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
  
  Game.prototype.fireBullet = function () {
    this.bullets.push(this.ship.fireBullet(this));
  };

  Game.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    var game = this;
    
    function forward () {
      ship.power(10);
    };

    function turnCCW () {
      ship.shiftDir(-1);
    };

    function reverse () {
      ship.power(-10);
    };

    function turnCW () {
      ship.shiftDir(1);
    };
    
    $(document).keydown(function (event) {
      switch(event.which) {
        case 87:
          forward();
          break;
        case 83:
          reverse();
          break;
        case 65:
          turnCCW();
          break;
        case 68:
          turnCW();
          break;
        case 32:
          game.fireBullet();
          break;
      }
    });
  };

})(this);