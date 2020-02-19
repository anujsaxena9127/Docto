import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Platform,
  BackHandler,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";
import { Badge, Button } from "react-native-elements";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 87;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("../assets/headimg.png") // Put your own image here
};

class Pharmacydetail extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      cart: []
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
    if (this.state.cart.length > 0) {
      Alert.alert(
        "Your cart items will be deleted, are you sure?",
        "Pressing ok will take you back and deleat cart items.",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              console.log(this.props.navigation.state.routeName);
            },
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              this.props.navigation.navigate("PharmacyHome");
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate("PharmacyHome");
    }
    // We can move to any screen. If we want
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  render() {
    const pharmacyObject = this.props.navigation.getParam("object", "");

    renderMedicines = pharmacyObject.medicineList.map(medicine => {
      return (
        <View
          key={medicine.medicineId}
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 35,
            marginTop: 10,
            marginBottom: 10,
            padding: 20,
            marginLeft: 13,
            marginRight: 13
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
              {medicine.medicineName}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Concentration: {medicine.concentration}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Price of 10 tablets: {medicine.priceOfTenTabs}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              type="clear"
              onPress={() => {
                alert("Added one Leaf to cart.");
                var currentCartData = this.state.cart;
                var dataToBePushed = medicine.medicineName;
                var newCartData = currentCartData.concat(dataToBePushed);
                this.setState({ cart: newCartData });
              }}
              title="Add to cart"
            ></Button>
            {/* <Icon
              name="shopping-cart"
              type="evilicon"
              color="#575757"
              size={30}
              onPress={() => {
                alert("Added one Leaf to cart.");
                var currentCartData = this.state.cart;
                var dataToBePushed = medicine.medicineName;
                var newCartData = currentCartData.concat(dataToBePushed);
                this.setState({ cart: newCartData });
              }}
            /> */}
          </View>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={(SCREEN_HEIGHT / 10) * 4}
          extraScrollHeight={20}
          navbarColor="#8641F7"
          title={pharmacyObject.pharmacyName}
          titleStyle={styles.titleStyle}
          backgroundImage={images.background}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
            onScrollEndDrag: () => console.log("onScrollEndDrag")
          }}
        />
      </View>
    );
  }

  dialCall = () => {
    const pharmacyObject = this.props.navigation.getParam("object", "");

    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + pharmacyObject.contact;
    } else {
      phoneNumber = "telprompt:" + pharmacyObject.contact;
    }

    Linking.openURL(phoneNumber);
  };

  renderContent = () => {
    const pharmacyObject = this.props.navigation.getParam("object", "");
    // console.log(pharmacyObject);
    console.log("cart", this.state.cart);
    // if (doctorObject != null) {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ backgroundColor: "#f2f2f2" }}>
            <Text style={{ fontSize: 22, margin: 13 }}>
              Location: {pharmacyObject.PharmacyLocation}
            </Text>
            <Text style={{ fontSize: 22, margin: 13 }}>
              Established In: {pharmacyObject.established}
            </Text>
            <Text
              style={{ fontSize: 22, margin: 13, color: "#33a1f5" }}
              onPress={this.dialCall}
            >
              +91 {pharmacyObject.contact} -
              <Icon
                name="phone"
                type="evilicon"
                color="#33a1f5"
                size={20}
                onPress={() => {
                  alert("Added to cart.");
                }}
              />
            </Text>
            <Text style={{ fontSize: 22, margin: 13 }}>
              Open TIll: {pharmacyObject.openTill}
            </Text>
            <Text style={{ fontSize: 22, margin: 13, fontWeight: "bold" }}>
              Medicines:
            </Text>
            {renderMedicines}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    // } else {
    //   return null;
    // }
  };

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={() => {
            console.log("Cart");
            if (this.state.cart.length > 0) {
              this.props.navigation.navigate("Cart", {
                cartData: this.state.cart
              });
            } else {
              alert("Cart empty.");
            }
          }}
        >
          <Icon name="shopping-cart" size={25} color="#fff" />
          <Badge
            status="success"
            containerStyle={{ position: "absolute", top: -7, right: -7 }}
            value={this.state.cart.length}
          />
        </TouchableOpacity>
        {/* <View style={styles.navBar}>
          <TouchableOpacity
            style={(styles.iconRight, { marginRight: 5 })}
            onPress={this.showActionSheet}
          >
            <Icon name="map" size={25} color="#fff" />
          </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => {
            this.props.navigation.navigate("Search", {
              object: pharmacy,
              city: this.state.city
            });
          }}
        >
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
}

export default Pharmacydetail;
