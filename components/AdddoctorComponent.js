import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../shared/Styles";
import t from "tcomb-form-native";


const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 87;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const Form = t.form.Form;


const images = {
  background: require("../assets/headimg.png") // Put your own image here
};

var City = t.enums({
  Mandya: 'Mandya',
  Mysore: 'Mysore',
  Bangalore: 'Bangalore'
});

var User = t.struct({
  name: t.String,
  specialization: t.String,
  experience: t.String,
  email: t.maybe(t.String),
  age: t.Number,
  contact: t.Number,
  city: City, // enum
  Enter_your_clinic_or_hospital_address: t.String,
  i_agree_to_the_docto_terms: t.Boolean
});

class Adddoctor extends Component {
  static navigationOptions = {
    headerShown: false
  };

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }

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
          navbarColor="#8641F7"
          title={"Add Doctor"}
          titleStyle={styles.titleStyle}
          backgroundImage={images.background}
          backgroundImageScale={1.2}
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
      <SafeAreaView>
        <ScrollView>
        <View style={styles.container2}>
            <View style={styles.renderCard}>
              <Form
                ref={c => (this._form = c)} // assign a ref
                type={User}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center"
                }}
              >
                <Button
                  title="Sign Up To Docto"
                  containerStyle={{
                    maxWidth: 300,
                    minWidth: 300
                  }}
                  // titleStyle={{ fontSize: 13 }}
                  onPress={this.handleSubmit}
                />
              </View>
            </View>
            <Text style={{ minHeight: 300 }}></Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    // } else {
    //   return null;
    // }
  };
}




export default Adddoctor;
