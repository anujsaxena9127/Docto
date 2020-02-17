import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 95;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("../assets/headimg.png"), // Put your own image here
  background2: require("../assets/heading2.png")
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
          navbarColor="#ff2974"
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
    return (
      <View style={{ backgroundColor: "#f9f9f9" }}>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
        <Text>Hola header</Text>
      </View>
    );
  };
}

export default Doctordetail;

//   render() {
//     const object = this.props.navigation.getParam("object", "");

//     return (
//       <View>
//         <Text>Hola doctor detail.{object.name}</Text>
//       </View>
//     );
//   }

// export default Doctordetail;
