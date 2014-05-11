(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function (pos, dir) {
    var vel = [];
    vel[0] = (Bullet.SPEED / 10) * Math.cos((dir / 10) * Math.PI);
    vel[1] = (Bullet.SPEED / 10) * Math.sin((dir / 10) * Math.PI);
    Asteroids.MovingObject.apply(this, [pos, vel, Bullet.RADIUS, Bullet.COLOR]);
  }
  
  Bullet.SPEED = 150;
  Bullet.RADIUS = 2;
  Bullet.COLOR = 'green';
  
  Bullet.inherits(Asteroids.MovingObject);
  
})(this);