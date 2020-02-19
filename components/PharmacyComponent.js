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
import pharmacy from "../shared/Pharmacy";
import { GetCityData, GetOptions } from "../shared/Functions";
import { Button, Avatar } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 87;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("../assets/headimg.png") // Put your own image here
};

const options = ["Mysore", "Mandya", "Bengaluru", "Cancel"];

class Pharmacy extends Component {
  static navigationOptions = {
    headerShown: false
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  constructor(props) {
    super(props);
    this.state = {
      city: "Mandya"
    };
  }
  render() {
    const cityIndex = GetCityData(pharmacy, this.state.city);
    const cityPharmacy = pharmacy[cityIndex].pharmacyList;
    renderPharmacy = cityPharmacy.map(pharm => {
      return (
        <View
          key={pharm.pharmacyId}
          style={{
            backgroundColor: "#fff",
            borderRadius: 35,
            marginTop: 10,
            marginBottom: 10,
            padding: 20,
            marginLeft: 13,
            marginRight: 13
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", minHeight: 50 }}>
              {pharm.pharmacyName}
            </Text>
            <Avatar
              rounded
              size="medium"
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              }}
            />
          </View>
          <Text style={{ fontSize: 17 }}>Specilist in : {pharm.contact}</Text>
          <Text style={{ fontSize: 17 }}>
            Location : {pharm.PharmacyLocation}
          </Text>
          <Button
            title="Details"
            titleStyle={{ fontSize: 14 }}
            type="clear"
            onPress={() => {
              console.log(pharm.name + "Pressed");
              this.props.navigation.navigate("Pharmacydetail", {
                object: pharm
              });
            }}
          />
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
          title="Pharmacy"
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
      <View style={{ backgroundColor: "#f2f2f2" }}>
        <Text style={{ minHeight: 20 }}></Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 35,
            margin: 13,
            padding: 20
          }}
        >
          <TouchableOpacity onPress={this.showActionSheet}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: "center",
                color: "#33a1f5"
              }}
            >
              Location : {this.state.city}
            </Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={<Text style={{ fontSize: 15 }}>Select your city.</Text>}
          // message="hola"
          options={options}
          cancelButtonIndex={3}
          destructiveButtonIndex={3}
          onPress={index => {
            console.log(index, "pressed");
            console.log(options[index]);
            if (options[index] != "Cancel") {
              this.setState({ city: options[index] });
            }
          }}
        />
        {renderPharmacy}
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
            onPress={this.showActionSheet}
          >
            <Icon name="map" size={25} color="#fff" />
          </TouchableOpacity>
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
        </View>
      </View>
    </View>
  );
}

export default Pharmacy;
