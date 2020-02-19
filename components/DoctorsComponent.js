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
import doctors from "../shared/Doctors";
import { GetCityData, GetOptions } from "../shared/Functions";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
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

class Doctors extends Component {
  // componentDidMount() {
  //   GetOptions(doctors, options);
  // }

  static navigationOptions = {
    headerShown: false
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  constructor(props) {
    super(props);
    this.state = {
      city: "Mysore",
      cityDoctors: ""
    };
  }

  render() {
    const cityIndex = GetCityData(doctors, this.state.city);
    const cityDoctors = doctors[cityIndex].doctorList;
    renderDoctors = cityDoctors.map(doctor => {
      return (
        <View
          key={doctor.id}
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
              {doctor.name}
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
          <Text style={{ fontSize: 17 }}>Specilist in : {doctor.type}</Text>
          <Text style={{ fontSize: 17 }}>Location : {doctor.location}</Text>
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
            this.props.navigation.navigate("Adddoctor");
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
                object: doctors,
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

export default Doctors;
