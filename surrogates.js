Function.prototype.inherits = function (superClass) {
  function Surrogate() {}
  Surrogate.prototype = superClass.prototype;

  this.prototype = new Surrogate();
};

function MovingObject() {
  this.name = "MOVIN' OBJECT-UH";
};

function Ship () {
  MovingObject.call(this);
};
Ship.inherits(MovingObject);

function Asteroid () {};
Asteroid.inherits(MovingObject);

var ship = new Ship();
console.log(ship.name);
console.log(ship instanceof MovingObject);