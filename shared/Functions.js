export function GetCityData(object, city) {
  for (var i = 0; i < object.length; i++) {
    if (object[i].cityName == city) {
      return i;
    }
  }
}

export function GetOptions(object, arr) {
  for (var i = 0; i < object.length; i++) {
    arr.push(object[i].cityName);
  }
}

export function GetCartTotalPrice(object) {
  var cartTotal = 0;
  for (var i = 0; i < object.length; i++) {
    cartTotal += object[i].priceOfTenTabs;
  }
  return cartTotal;
}

export function GetMedicineNames(object, city, searchKey) {
  var medicineNmaesArray = [];
  for (var i = 0; i < object.length; i++) {
    if (object[i].cityName == city) {
      for (var j = 0; j < object[i].pharmacyList.length; j++) {
        for (
          var k = 0;
          k < object[i].pharmacyList[j].medicineList.length;
          k++
        ) {
          if (
            object[i].pharmacyList[j].medicineList[k].medicineName
              .toUpperCase()
              .includes(searchKey.toUpperCase())
          ) {
            medicineNmaesArray.push(j);
          }
        }
      }
    }
  }
  return medicineNmaesArray;
}

export function GetMedicineCountIncart(cartData, medicineName) {
  var count = 0;
  for (var i = 0; i < cartData.length; i++) {
    if (cartData[i].medicineName == medicineName) {
      count += 1;
    }
  }
  return count;
}
