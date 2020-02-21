import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar } from "react-native-elements";
import { GetMedicineCountIncart } from "../shared/Functions";
class Medicinesearch extends React.Component {
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
    const medicines = this.props.navigation.getParam("object", "");

    if (field.value().length > 0) {
      var searchDataArr = [];

      for (var i = 0; i < medicines.length; i++) {
        if (
          medicines[i].medicineName
            .toUpperCase()
            .includes(field.value().toUpperCase())
        ) {
          searchDataArr.push(medicines[i]);
        }
      }
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
          <View key={data.medicineId} style={styles.renderMedicineCards}>
            <View style={{ flex: 5 }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
                {data.medicineName}
              </Text>
              <Text style={{ fontSize: 17 }}>
                Concentration: {data.concentration}
              </Text>
              <Text style={{ fontSize: 17 }}>
                Price of 10 tablets: ₹{data.priceOfTenTabs}
              </Text>
            </View>
            {/* <View
              style={{
                flex: 1,
                borderColor: "#ff8c8c",
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 5,
                maxWidth: 50
              }}
            >
              <Button
                type="clear"
                onPress={() => {
                  // alert("Added 10 tablets/one bottel to cart.");
                  var currentCartData = this.state.cart;
                  var dataToBePushed = data;
                  var newCartData = currentCartData.concat(dataToBePushed);
                  this.setState({ cart: newCartData });
                }}
                title="+"
                containerStyle={{ maxHeight: 50 }}
                buttonStyle={{ backgroundColor: "#ff8c8c" }}
                titleStyle={{ color: "#fff", fontSize: 12 }}
              ></Button>
              <Text
                style={{
                  alignSelf: "center",
                  margin: 2,
                  // marginRight: 6,
                  fontSize: 15,
                  color: "#f55151"
                }}
              >
                {GetMedicineCountIncart(this.state.cart, data.medicineName)}
              </Text>
              <Button
                type="clear"
                onPress={() => {
                  for (var i = 0; i < this.state.cart.length; i++) {
                    var currentCart = this.state.cart;
                    if (data.medicineName == currentCart[i].medicineName) {
                      currentCart.splice(i, 1);
                      this.setState({ cart: currentCart });
                      break;
                    } else {
                      console.log("This medicine is not present in the cart");
                    }
                  }
                }}
                title="-"
                containerStyle={{ maxHeight: 50 }}
                buttonStyle={{ backgroundColor: "#ff8c8c" }}
                titleStyle={{ color: "#fff", fontSize: 12 }}
              ></Button>
            </View> */}
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
            <View
              style={{ margin: 13, marginTop: 10, backgroundColor: "#f2f2f2" }}
            >
              <OutlinedTextField
                label="Search Medicines In this pharmacy"
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

export default Medicinesearch;
