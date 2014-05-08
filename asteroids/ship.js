(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function (superClass) {
    function Surrogate() {}
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  };

  var Ship = Asteroids.Ship = function (pos) {
    Asteroids.MovingObject.apply(this, [pos, [0, 0], Ship.RADIUS, Ship.COLOR]);
    this.dir = 1.7;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'gray';

  Ship.prototype.power = function (impulse) {
    var newVel = this.vel.slice(0);
    newVel[0] += impulse * Math.cos(this.dir * Math.PI);
    newVel[1] += impulse * Math.sin(this.dir * Math.PI);

    if (!this.speedLimit(newVel)) {
      this.vel = newVel;
    }
  };

  Ship.prototype.speedLimit = function (newVel) {
    return (Math.pow(newVel[0], 2) + Math.pow(newVel[1], 2) >= 18)
  };

  Ship.prototype.shiftDir = function (mod) {
    this.dir = (this.dir + mod) % 2;
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      ((this.dir + 0.15) % 2) * Math.PI,
      ((this.dir - 0.15) % 2) * Math.PI,
      false
    );

    ctx.fill();
  };

  Ship.prototype

})(this);