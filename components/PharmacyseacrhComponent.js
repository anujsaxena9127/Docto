import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar } from "react-native-elements";
import { GetCityData, GetMedicineNames } from "../shared/Functions";
class PharmacySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: []
    };
  }

  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#8641F7"
    },
    headerTintColor: "#fff"
  };

  fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;
    const object = this.props.navigation.getParam("object", "");
    const city = this.props.navigation.getParam("city", "");
    const cityIndex = GetCityData(object, city);
    const cityPharmcay = object[cityIndex].pharmacyList;
    const medicineName = object[cityIndex].pharmacyList.medicineList;

    console.log("City Pharmacy List", cityPharmcay);
    console.log("Medicine Name List", medicineName);

    if (field.value().length > 0) {
      var searchDataArr = [];
      //   var pharmacyIndexs = GetMedicineNames(object, city, field.value());

      for (var i = 0; i < cityPharmcay.length; i++) {
        if (
          cityPharmcay[i].pharmacyName
            .toUpperCase()
            .includes(field.value().toUpperCase()) ||
          cityPharmcay[i].PharmacyLocation.toUpperCase().includes(
            field.value().toUpperCase()
          )
        ) {
          searchDataArr.push(cityPharmcay[i]);
        }
      }

      //   for (var j = 0; j < pharmacyIndexs.length; j++) {
      //     for (var k = 0; k < searchDataArr.length; k++) {
      //       if (pharmacyIndexs[j].pharmacyId == searchDataArr[k].pharmacyId) {
      //         console.log("already searcjed");
      //       } else {
      //         searchDataArr.push(cityPharmcay[pharmacyIndexs[j]]);
      //       }
      //     }
      //   }

      this.setState({
        searchData: searchDataArr
      });
    } else {
      return null;
    }
  };

  render() {
    renderSearch = this.state.searchData.map(data => {
      if (this.state.searchData.length > 0) {
        console.log("Printing Doctors");
        return (
          <View
            key={data.pharmacyId}
            style={{
              backgroundColor: "#fff",
              borderRadius: 35,
              margin: 13,
              padding: 20
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
                {data.pharmacyName}
              </Text>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                }}
              />
            </View>
            <Text style={{ fontSize: 17 }}>
              Established in : {data.established}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Location : {data.PharmacyLocation}
            </Text>
            <Text style={{ fontSize: 17 }}>Open Till : {data.openTill}</Text>

            <Button
              title="Details"
              titleStyle={{ fontSize: 14 }}
              type="clear"
              onPress={() => {
                console.log(data.name + "Pressed");
                this.props.navigation.navigate("Doctordetail", {
                  object: data
                });
              }}
            />
          </View>
        );
      } else {
        console.log("Not Printing Doctors");
        return (
          <View>
            <Text>No doctor Found.</Text>
          </View>
        );
      }
    });
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={{ margin: 13, marginTop: 10 }}>
              <OutlinedTextField
                label="Search Doctors"
                keyboardType="default"
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
                autoFocus={true}
              />
            </View>
            {renderSearch}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PharmacySearch;
