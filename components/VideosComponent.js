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
  background: require("../assets/headimg.png") // Put your own image here
};

class Videos extends Component {
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
    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={(SCREEN_HEIGHT / 10) * 4}
          extraScrollHeight={20}
          navbarColor="#ff2974"
          title="Videos"
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

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <View style={styles.navBar}>
          {/* <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => {
              console.log("Add");
            }}
          >
            <Icon name="add" size={25} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => {
              console.log("Info");
              this.props.navigation.navigate("About", {
                // object: pharmacy,
                // city: this.state.city,
                // deliveryBoyNo: pharmacy[cityIndex].deliveryBoyNo
              });
            }}
          >
            <Icon name="info" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={styles.iconRight}
          onPress={() => {
            console.log("Search");
          }}
        >
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default Videos;
