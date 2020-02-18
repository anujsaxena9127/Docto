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
    if (field1.value().length > 3 && field2.value() > 1) {
      Linking.openURL(
        "whatsapp://send?text=Hello!! I Want to Make an Appointment. My name is " +
          field1.value() +
          "and my age is " +
          field2.value() +
          "&phone=+91" +
          doctorObject.contact
      );
    } else {
      alert("Please Enter the details properly!!!");
    }
  };

  renderContent = () => {
    const doctorObject = this.props.navigation.getParam("object", "");
    if (doctorObject != null) {
      return (
        <SafeAreaView>
          <ScrollView>
            <View style={{ backgroundColor: "#f5f5f5" }}>
              <View style={{ marginTop: 13 }}>
                <Text style={{ fontSize: 25, margin: 10 }}>
                  Expert in : {doctorObject.type}
                </Text>
                <Text style={{ fontSize: 25, margin: 10 }}>
                  Education : {doctorObject.education}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  margin: 13,
                  borderRadius: 35,
                  padding: 10,
                  paddingTop: 20
                }}
              >
                <View style={{ margin: 13, marginTop: 10 }}>
                  <OutlinedTextField
                    label="Enter your name"
                    keyboardType="default"
                    // onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef1}
                    // autoFocus={true}
                  />
                  <OutlinedTextField
                    label="Enter your age"
                    keyboardType="number-pad"
                    // onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef2}
                    // autoFocus={true}
                  />
                </View>
                <View style={{ margin: 35, marginTop: 10, maxHeight: 40 }}>
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
