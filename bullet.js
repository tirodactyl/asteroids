(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function (game, pos, dir) {
    var vel = [];
    vel[0] = (Bullet.SPEED / 10) * Math.cos((dir / 10) * Math.PI);
    vel[1] = (Bullet.SPEED / 10) * Math.sin((dir / 10) * Math.PI);
    Asteroids.MovingObject.apply(this, [pos, vel, Bullet.RADIUS, Bullet.COLOR]);
    this.game = game;
  }
  
  Bullet.SPEED = 150;
  Bullet.RADIUS = 2;
  Bullet.COLOR = 'green';
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.hitAsteroids = function () {
    var bullet = this
        
    this.game.asteroids.every(function(asteroid) {
      if (bullet.isCollidedWith(asteroid)) {
        bullet.game.removeAsteroid(asteroid);
        bullet.game.removeBullet(bullet);
        return false;
      } else {
        return true;
      }
    });
  };
  
  Bullet.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.apply(this);
    this.hitAsteroids();
  }
  
})(this);