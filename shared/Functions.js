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

export function GetWhatsappTextFromCart(
  cartObject,
  custormerName,
  customerAddress,
  pharmacyName
) {
  var string =
    "Hi, I want to order some medicines.\nI am '" +
    custormerName +
    "\n\nI want these medicines with a recipt from\n" +
    "'" +
    pharmacyName +
    "'" +
    "'.\n\nThe delivery address is\n'" +
    customerAddress +
    "'\n\n" +
    "My order is \n";
  cartObject.map(medicine => {
    string =
      string +
      medicine.medicineName +
      "*1\t\t" +
      "₹" +
      medicine.priceOfTenTabs +
      "\n";
  });
  string += "\n\nCart total\t\t" + "₹" + GetCartTotalPrice(cartObject);
  return string;
}
