import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  BackHandler,
  Linking,
  TouchableOpacity
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar, SocialIcon, Divider } from "react-native-elements";
import { GetCartTotalPrice } from "../shared/Functions";
import Styles from "../shared/Styles";
import { Icon } from "react-native-vector-icons/FontAwesome";
class Pharmacycart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Pharmacydetail");
    // We can move to any screen. If we want
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  static navigationOptions = {
    title: "Cart",
    headerStyle: {
      backgroundColor: "#8641F7"
    },
    headerTintColor: "#fff"
  };

  fieldRef1 = React.createRef();
  fieldRef2 = React.createRef();

  sendOnWhatsApp = () => {
    const deliveryBoyNo = this.props.navigation.getParam("deliveryBoyNo", "");
    let { current: field1 } = this.fieldRef1;
    let { current: field2 } = this.fieldRef2;
    if (field1.value().length > 3 && field2.value().length > 20) {
      Linking.openURL(
        "whatsapp://send?text=Hello!! I Want to Make an Appointment. My name is " +
          field1.value() +
          " and my address is " +
          field2.value() +
          "&phone=+91" +
          deliveryBoyNo
      );
    } else {
      alert("Please Enter the details properly!!!");
    }
  };

  render() {
    const cartData = this.props.navigation.getParam("cartData", "");
    const cartTotal = GetCartTotalPrice(cartData);
    // console.log(cartTotal);

    renderMedicines = cartData.map((medicine, index) => {
      return (
        <View style={{ flex: 1, flexDirection: "row" }} key={index}>
          <View style={{ flex: 7 }}>
            <Text style={{ minHeight: 7 }}></Text>
            <Text>{medicine.medicineName} * 1</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ minHeight: 7 }}></Text>
            <Text>₹ {medicine.priceOfTenTabs}</Text>
          </View>
          {/* <View style={{ flex: 2 }}>
            <Text style={{ minHeight: 7 }}></Text>
            <TouchableOpacity
              onPress={() => {
                cartData.splice(index, index);
              }}
            >
              <Text style={{ color: "#33a1f5" }}>Remove</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      );
    });

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10 }}>
            <View style={Styles.renderCard}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 7 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Medicines
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Price
                  </Text>
                </View>
                {/* <View style={{ flex: 2 }}>
                  <Text></Text>
                </View> */}
              </View>
              {renderMedicines}
              <Text style={{ minHeight: 7 }}></Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 7 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Cart Total:
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    ₹{cartTotal}
                  </Text>
                </View>
                {/* <View style={{ flex: 2 }}>
                  <Text></Text>
                </View> */}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 10
                  }}
                >
                  Place Order
                </Text>
                <Text style={{ minHeight: 10 }}></Text>
                <OutlinedTextField
                  label="Enter your name"
                  keyboardType="default"
                  ref={this.fieldRef1}
                  title="Name should have more the three characters."
                />
                <Text style={{ minHeight: 10 }}></Text>
                <OutlinedTextField
                  label="Enter your Address"
                  keyboardType="default"
                  ref={this.fieldRef2}
                  title="Name should have more the twenty characters."
                />
              </View>
              <View style={{ margin: 25, marginTop: 10, maxHeight: 40 }}>
                <Button
                  onPress={this.sendOnWhatsApp}
                  title="Place order through WhatsApp"
                  type="outline"
                  buttonStyle={{
                    borderColor: "green",
                    borderWidth: 2,
                    borderRadius: 15
                  }}
                  titleStyle={{ color: "green" }}
                  icon={<SocialIcon type="whatsapp" light raised={false} />}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Pharmacycart;
