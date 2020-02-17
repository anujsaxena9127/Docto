export function GetCityData(object, city) {
  for (var i = 0; i < object.length; i++) {
    if (object[i].cityName == city) {
      return i;
    }
  }
}

export function GetOptions(object, arr) {
  for (var i = 0; i < object.length; i++) {
    arr.push(object[i].cityNmae);
  }
}
