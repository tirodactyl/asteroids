var sum = function () {
  var sum = 0;
  console.log(arguments);
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  };
  return sum;
};

// console.log(sum(1,2,3,4,5,6));


Function.prototype.myBind = function (obj) {
  var that = this;
  var args = [].slice.call(arguments, 1);
  console.log(args);
  return function () { that.apply(obj, args) };
};

var printMe = function (a, b, c) {
  console.log(this.text + a + b + c);
}

// printMe();
// printMe.myBind({text:"hello"}, 1, 2, 3)();

var curriedSum = function (n) {
  var fun = this;
  var numbers = [];

  return function _curriedSum (num) {
    numbers.push(num);

    if (numbers.length === n) {
      return sum.apply(this, numbers);
    } else {
      return _curriedSum;
    }
  }
}

var test = curriedSum(4)
console.log(test(5)(30)(20)(1));

Function.prototype.curry = function (n) {
  var fun = this;
  var args = [];

  return function _curriedFun (obj) {
    args.push(obj);

    if (args.length === n) {
      return fun.apply(this, args);
    } else {
      return _curriedFun;
    }
  }
}


function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree.curry(3)(4)(20)(3));