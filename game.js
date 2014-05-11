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
    this.bullets.forEach(function (bullet) {
      bullet.move();
    });
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
      if (asteroid) {
        
      } else if (asteroid.isCollidedWith(game.ship)) {
        game.stop();
        window.alert("Alderaan's revenge!");
      }
    });
  };
  
  Game.prototype.fireBullet = function () {
    this.bullets.push(this.ship.fireBullet());
  }

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