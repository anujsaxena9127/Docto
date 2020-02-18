import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";

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

  renderContent = () => {
    const doctorObject = this.props.navigation.getParam("object", "");
    if (doctorObject != null) {
      return (
        <SafeAreaView>
          <ScrollView>
            <View style={{ backgroundColor: "#f5f5f5" }}>
              <Text style={{ fontSize: 25, margin: 10 }}>
                Expert in : {doctorObject.type}
              </Text>
              <Text style={{ fontSize: 25, margin: 10 }}>
                Education : {doctorObject.education}
              </Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
              <Text>Hola docot</Text>
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
