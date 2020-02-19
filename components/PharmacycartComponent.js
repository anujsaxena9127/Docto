import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  BackHandler
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Button, Avatar, SocialIcon } from "react-native-elements";
import { GetCartTotalPrice } from "../shared/Functions";
import Styles from "../shared/Styles";
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
  render() {
    const deliveryBoyNo = this.props.navigation.getParam("deliveryBoyNo", "");
    const cartData = this.props.navigation.getParam("cartData", "");
    const cartTotal = GetCartTotalPrice(cartData);
    // console.log(cartTotal);

    renderMedicines = cartData.map((medicine, index) => {
      return (
        <View key={index}>
          <Text>{medicine.medicineName} x 1</Text>
        </View>
      );
    });

    renderMedicinePrice = cartData.map((price, index) => {
      return (
        <View key={index}>
          <Text>₹ {price.priceOfTenTabs}</Text>
        </View>
      );
    });

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10 }}>
            <View style={Styles.renderCard}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Medicines
                  </Text>
                  <Text style={{ minHeight: 7 }}></Text>
                  {renderMedicines}
                  <Text style={{ minHeight: 7 }}></Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Cart Total :
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Price
                  </Text>
                  <Text style={{ minHeight: 7 }}></Text>
                  {renderMedicinePrice}
                  <Text style={{ minHeight: 7 }}></Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    ₹ {cartTotal}
                  </Text>
                </View>
              </View>
              <View style={{ margin: 25, marginTop: 30, maxHeight: 40 }}>
                <Button
                  //   onPress={this.sendOnWhatsApp}
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
