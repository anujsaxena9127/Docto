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
import MysDoctors from "../shared/MysDoctors";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
import { Button } from "react-native-elements";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 87;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("../assets/headimg.png"), // Put your own image here
  background2: require("../assets/heading2.png")
};

class Doctors extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    renderDoctors = MysDoctors.map(doctor => {
      return (
        <View
          key={doctor.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 35,
            marginTop: 10,
            marginBottom: 10,
            padding: 20
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
              console.log(doctor.name + "Pressed");
              this.props.navigation.navigate("Doctordetail", {
                object: doctor
              });
            }}
          > */}
          <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
            {doctor.name}
          </Text>
          <Text style={{ fontSize: 17 }}>Specilist in : {doctor.type}</Text>
          <Text style={{ fontSize: 17 }}>Experiance : {doctor.experiance}</Text>
          <Text style={{ fontSize: 17 }}>Location : {doctor.location}</Text>
          <Text style={{ fontSize: 17 }}>Contact : {doctor.contact}</Text>
          <Text style={{ fontSize: 17 }}>Timing : {doctor.timing}</Text>
          <Button
            title="Details"
            titleStyle={{ fontSize: 14 }}
            type="clear"
            onPress={() => {
              console.log(doctor.name + "Pressed");
              this.props.navigation.navigate("Doctordetail", {
                object: doctor
              });
            }}
          />
          {/* </TouchableOpacity> */}
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={(SCREEN_HEIGHT / 10) * 4}
          extraScrollHeight={20}
          navbarColor="#ff2974"
          title="Doctors"
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
        <Text style={{ minHeight: 20 }}></Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 35,
            marginTop: 10,
            marginBottom: 10,
            padding: 20
          }}
        >
          <Text>Location</Text>
        </View>
        {renderDoctors}
      </View>
    );
  };

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={() => {
            console.log("Add");
          }}
        >
          <Icon name="add" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={(styles.iconRight, { marginRight: 5 })}
            onPress={() => {
              this.props.navigation.navigate("Search", {
                object: MysDoctors
              });
            }}
          >
            <Icon name="map" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => {
              this.props.navigation.navigate("Search", {
                object: MysDoctors
              });
            }}
          >
            <Icon name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Doctors;
