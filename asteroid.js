(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function (superClass) {
    function Surrogate() {}
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  };

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.apply(this, [pos, vel, Asteroid.COLOR, Asteroid.RADIUS]);
  };

  Asteroid.COLOR = "brown";
  Asteroid.RADIUS = 20;
  
  Asteroid.RandyRad = function () {
    return 10 + (Math.random() * Asteroid.RADIUS);
  };
  Asteroid.RandyCol = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var pos = new Array(2);
    var axisToSet = (Math.random() > .5 ? 1 : 0);
    var vel = [];
    var velMult = [];
    
    
    velMult[0] = (Math.random() > .5 ? 1 : -1);
    velMult[1] = (Math.random() > .5 ? 1 : -1);
    
    pos[axisToSet] = (velMult[axisToSet] > 0 ? 0 : 1);
    
    // ternary operation adds 1 because 0 evaluates to false
    pos[0] = Math.floor(((pos[0] + 1) ? pos[0] : Math.random()) * dimX);
    pos[1] = Math.floor(((pos[1] + 1) ? pos[1] : Math.random()) * dimY);

    vel[0] = (Math.random() * 3 * velMult[0]);
    vel[1] = (Math.random() * 3 * velMult[1]);

    var asteroid =  new Asteroid(pos, vel);
    asteroid.color = Asteroid.RandyCol();
    asteroid.radius = Asteroid.RandyRad();
    
    return asteroid;
  };
})(this);