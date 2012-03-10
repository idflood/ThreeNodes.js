var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ThreeNodes.uid = 0;

ThreeNodes.Utils = {};

ThreeNodes.Utils.get_uid = function() {
  return ThreeNodes.uid += 1;
};

ThreeNodes.Utils.Rc4Random = (function() {
  "use strict";
  function Rc4Random(seed) {
    this.getRandomNumber = __bind(this.getRandomNumber, this);
    this.getRandomByte = __bind(this.getRandomByte, this);
    var i, j, t, _ref, _ref2;
    this.keySchedule = [];
    this.keySchedule_i = 0;
    this.keySchedule_j = 0;
    for (i = 0, _ref = 256 - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      this.keySchedule[i] = i;
    }
    j = 0;
    for (i = 0, _ref2 = 256 - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
      j = (j + this.keySchedule[i] + seed.charCodeAt(i % seed.length)) % 256;
      t = this.keySchedule[i];
      this.keySchedule[i] = this.keySchedule[j];
      this.keySchedule[j] = t;
    }
  }

  Rc4Random.prototype.getRandomByte = function() {
    var t;
    this.keySchedule_i = (this.keySchedule_i + 1) % 256;
    this.keySchedule_j = (this.keySchedule_j + this.keySchedule[this.keySchedule_i]) % 256;
    t = this.keySchedule[this.keySchedule_i];
    this.keySchedule[this.keySchedule_i] = this.keySchedule[this.keySchedule_j];
    this.keySchedule[this.keySchedule_j] = t;
    return this.keySchedule[(this.keySchedule[this.keySchedule_i] + this.keySchedule[this.keySchedule_j]) % 256];
  };

  Rc4Random.prototype.getRandomNumber = function() {
    var i, multiplier, number, _ref;
    number = 0;
    multiplier = 1;
    for (i = 0, _ref = 8 - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      number += this.getRandomByte() * multiplier;
      multiplier *= 256;
    }
    return number / 18446744073709551616;
  };

  return Rc4Random;

})();

ThreeNodes.Utils.flatArraysAreEquals = function(arr1, arr2) {
  var i, k, _len;
  if (arr1.length !== arr2.length) return false;
  for (i = 0, _len = arr1.length; i < _len; i++) {
    k = arr1[i];
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
