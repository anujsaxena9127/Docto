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
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";
import { Badge, Button } from "react-native-elements";
import { GetMedicineCountIncart } from "../shared/Functions";
import { OutlinedTextField } from "react-native-material-textfield";

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
      cart: [],
      modalVisible: false,
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
    if (this.state.cart.length > 0) {
      Alert.alert(
        "Your cart items will be deleted, are you sure?",
        "Pressing ok will take you back and deleat cart items.",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
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

  fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;
    const pharmacyObject = this.props.navigation.getParam("object", "");
    const medicines = pharmacyObject.medicineList;
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
            <View
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
            </View>
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

    const pharmacyObject = this.props.navigation.getParam("object", "");

    renderMedicines = pharmacyObject.medicineList.map(medicine => {
      return (
        <View key={medicine.medicineId} style={styles.renderMedicineCards}>
          <View style={{ flex: 5 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
              {medicine.medicineName}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Concentration: {medicine.concentration}
            </Text>
            <Text style={{ fontSize: 17 }}>
              Price of 10 tablets: ₹{medicine.priceOfTenTabs}
            </Text>
          </View>
          <View
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
                var dataToBePushed = medicine;
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
              {GetMedicineCountIncart(this.state.cart, medicine.medicineName)}
            </Text>
            <Button
              type="clear"
              onPress={() => {
                for (var i = 0; i < this.state.cart.length; i++) {
                  var currentCart = this.state.cart;
                  if (medicine.medicineName == currentCart[i].medicineName) {
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
    // console.log("cart", this.state.cart);
    // if (doctorObject != null) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
              // this.setState({ searchData: [] });
            }}
          >
            <SafeAreaView>
              <ScrollView>
                <View style={{ backgroundColor: "#f2f2f2" }}>
                  <View
                    style={{
                      backgroundColor: "#8641F7",
                      minHeight: 65,
                      alignContent: "flex-start",
                      justifyContent: "center",
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignSelf: "center",
                        marginLeft: 10
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                          // this.setState({ searchData: [] });
                        }}
                      >
                        <Icon name="chevron-left" size={35} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 9,
                        flexDirection: "row",
                        alignSelf: "center"
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 25 }}>
                        Search
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        margin: 13,
                        marginTop: 15,
                        backgroundColor: "#f2f2f2"
                      }}
                    >
                      <OutlinedTextField
                        label="Search Medicines In this pharmacy"
                        keyboardType="default"
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        autoFocus={true}
                      />
                      {renderSearch}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10 }}>
            <Text style={styles.detail}>
              Location: {pharmacyObject.PharmacyLocation}
            </Text>
            <Text style={styles.detail}>
              Established In: {pharmacyObject.established}
            </Text>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                marginBottom: 5,
                color: "#33a1f5"
              }}
              onPress={this.dialCall}
            >
              +91 {pharmacyObject.contact} -
              <Icon
                name="phone"
                type="evilicon"
                color="#33a1f5"
                size={20}
                // onPress={() => {
                //   alert("Added to cart.");
                // }}
              />
            </Text>
            <Text style={styles.detail}>
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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={() => {
            const pharmacyObject = this.props.navigation.getParam("object", "");
            const deliveryBoyNo = this.props.navigation.getParam(
              "deliveryBoyNo",
              ""
            );
            if (this.state.cart.length > 0) {
              this.props.navigation.navigate("Cart", {
                cartData: this.state.cart,
                deliveryBoyNo: deliveryBoyNo,
                pharmacyName: pharmacyObject.pharmacyName
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
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => {
            this.setModalVisible(true);
          }}
          // onPress={() => {
          //   const pharmacyObject = this.props.navigation.getParam("object", "");
          //   var medicines = pharmacyObject.medicineList;
          //   this.props.navigation.navigate("Medicinesearch", {
          //     object: medicines
          //     // city: this.state.city
          //   });
          // }}
        >
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Pharmacydetail;
