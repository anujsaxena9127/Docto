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
  Alert
} from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";
import { Button, SocialIcon } from "react-native-elements";
import { OutlinedTextField } from "react-native-material-textfield";
import Icon from "react-native-vector-icons/FontAwesome";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 87;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("../assets/headimg.png") // Put your own image here
};

class Doctordetail extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      screenText: "Hola"
    };
  }

  render() {
    const doctorObject = this.props.navigation.getParam("object", "");

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={(SCREEN_HEIGHT / 10) * 4}
          extraScrollHeight={20}
          navbarColor="#8641F7"
          title={doctorObject.name}
          titleStyle={styles.titleStyle}
          backgroundImage={images.background}
          backgroundImageScale={1.2}
          //   renderNavBar={this.renderNavBar}
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

  fieldRef1 = React.createRef();
  fieldRef2 = React.createRef();

  sendOnWhatsApp = () => {
    const doctorObject = this.props.navigation.getParam("object", "");
    let { current: field1 } = this.fieldRef1;
    let { current: field2 } = this.fieldRef2;
    if (field1.value().length > 3 && field2.value() > 5) {
      Linking.openURL(
        "whatsapp://send?text=Hello!! I Want to Make an Appointment. My name is " +
          field1.value() +
          " and my age is " +
          field2.value() +
          "&phone=+91" +
          doctorObject.contact
      );
    } else {
      alert("Please Enter the details properly!!!");
    }
  };

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
    const doctorObject = this.props.navigation.getParam("object", "");
    if (doctorObject != null) {
      return (
        <SafeAreaView>
          <ScrollView>
            <View style={{ backgroundColor: "#f2f2f2" }}>
              <View style={{ marginTop: 13 }}>
                <Text style={styles.detail}>
                  Specilisation in : {doctorObject.type}
                </Text>
                <Text style={styles.detail}>
                  Education : {doctorObject.education}
                </Text>
                <Text style={styles.detail}>
                  Experiance : {doctorObject.experiance}
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
                  +91 {doctorObject.contact} -
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
                  Timing : {doctorObject.timing}
                </Text>
                <Text style={styles.detail}>{doctorObject.discription}</Text>
              </View>
              <View style={styles.renderCard}>
                <View style={{ margin: 13, marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      marginBottom: 10
                    }}
                  >
                    Create Appointment
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
                    label="Enter your age"
                    keyboardType="number-pad"
                    ref={this.fieldRef2}
                    title="Age should be greater then 5"
                  />
                </View>
                <View style={{ margin: 33, marginTop: 10, maxHeight: 40 }}>
                  <Button
                    onPress={this.sendOnWhatsApp}
                    title="Make WhatsApp Appointment"
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
              <Text style={{ minHeight: 300 }}></Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  };
}

export default Doctordetail;
