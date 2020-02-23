import React from "react";
import Doctors from "./DoctorsComponent";
import Pharmacy from "./PharmacyComponent";
import DoctorSearch from "./DoctorsearchComponent";
import Pharmacysearch from "./PharmacyseacrhComponent";
import Doctordetail from "./DoctordetailComponent";
import Pharmacydetail from "../components/PharmacydetailComponent";
import Pharmacycart from "../components/PharmacycartComponent";
import Adddoctor from "../components/AdddoctorComponent";
import Addpharmacy from "../components/AddpharmacyComponent";
import Videos from "./VideosComponent";
import About from "./About";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const DoctorNavigator = createStackNavigator({
  DoctorHome: { screen: Doctors },
  Doctordetail: { screen: Doctordetail },
  Search: { screen: DoctorSearch },
  Adddoctor: { screen: Adddoctor },
  About: { screen: About }
});

const PharmacyNavigator = createStackNavigator({
  PharmacyHome: { screen: Pharmacy },
  Pharmacydetail: { screen: Pharmacydetail },
  Search: { screen: Pharmacysearch },
  Cart: { screen: Pharmacycart },
  Addpharmacy: { screen: Addpharmacy },
  About: { screen: About }
});

const VideoNavigator = createStackNavigator({
  Videos: { screen: Videos },
  About: { screen: About }
  // Search: { screen: Pharmacysearch },
  // Cart: { screen: Pharmacycart },
  // Addpharmacy: { screen: Addpharmacy }
});

const MainNavigator = createBottomTabNavigator({
  CounterHome: {
    screen: DoctorNavigator,
    initialRouteName: "Doctors",
    navigationOptions: {
      tabBarLabel: "Doctors",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user-md" color={tintColor} size={25} />
      ),
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#f2f2f2"
        },
        style: {
          borderTopColor: "#f2f2f2"
        }
      }
    }
  },
  Pharmacy: {
    screen: PharmacyNavigator,
    navigationOptions: {
      tabBarLabel: "Pharmacy",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cart-plus" color={tintColor} size={25} />
      ),
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#f2f2f2"
        },
        style: {
          borderTopColor: "#f2f2f2"
        },
        activeTintColor: "#00b020"
      }
    }
  }
  // Videos: {
  //   screen: VideoNavigator,
  //   navigationOptions: {
  //     tabBarLabel: "Videos",
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="film" color={tintColor} size={25} />
  //     ),
  //     tabBarOptions: {
  //       tabStyle: {
  //         backgroundColor: "#f2f2f2"
  //       },
  //       style: {
  //         borderTopColor: "#f2f2f2"
  //       },
  //       activeTintColor: "#ff0000"
  //     }
  //   }
  // }
});

const Main = createAppContainer(MainNavigator);

export default Main;
