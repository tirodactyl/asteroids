(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function (superClass) {
    function Surrogate() {}
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  };

  var Ship = Asteroids.Ship = function (pos) {
    Asteroids.MovingObject.apply(this, [pos, [0, 0], Ship.RADIUS, Ship.COLOR]);
    this.dir = 17;
    this.loaded = true;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'gray';

  Ship.prototype.power = function (impulse) {
    var newVel = this.vel.slice(0);
    newVel[0] += (impulse / 10) * Math.cos((this.dir / 10) * Math.PI);
    newVel[1] += (impulse / 10) * Math.sin((this.dir / 10) * Math.PI);

    if (!this.exceedSpeedLimit(newVel)) {
      this.vel = newVel;
    }
  };

  Ship.prototype.exceedSpeedLimit = function (newVel) {
    return (Math.pow(newVel[0], 2) + Math.pow(newVel[1], 2) >= 109)
  };

  Ship.prototype.shiftDir = function (mod) {
    this.dir = (this.dir + mod) % 20;
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      ((this.dir / 10) + 0.15) * Math.PI,
      ((this.dir / 10) - 0.15) * Math.PI,
      false
    );

    ctx.fill();
  };

  Ship.prototype.fireBullet = function(game) {
    this.loaded = false
    var bulletPos = [];
    bulletPos[0] = this.pos[0] + (10 * Math.cos((this.dir / 10) * Math.PI));
    bulletPos[1] = this.pos[1] + (10 * Math.sin((this.dir / 10) * Math.PI));
    
    var ship = this;
    setTimeout(function() { ship.loaded = true; }, 1000);
    
    return new Asteroids.Bullet(game, bulletPos, this.dir);
  };

})(this);