(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function (superClass) {
    function Surrogate() {}
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  };

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.apply(this, [pos, vel, Asteroid.RADIUS, Asteroid.COLOR]);
  };

  Asteroid.COLOR = "brown";
  Asteroid.RADIUS = 20;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var pos = [];
    pos[0] = Math.floor((Math.random() * dimX));
    pos[1] = Math.floor((Math.random() * dimY));

    var vel = [];
    var multX = (Math.random() > .5 ? 1 : -1);
    var multY = (Math.random() > .5 ? 1 : -1);
    vel[0] = (Math.random() * 3 * multX);
    vel[1] = (Math.random() * 3 * multY);

    return new Asteroid(pos, vel);
  };
})(this);