ThreeNodes.uid = 0;
ThreeNodes.Utils = {};
ThreeNodes.Utils.get_uid = function() {
  return ThreeNodes.uid += 1;
};
ThreeNodes.Utils.flatArraysAreEquals = function(arr1, arr2) {
  var i, k, _len;
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (i = 0, _len = arr1.length; i < _len; i++) {
    k = arr1[i];
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};