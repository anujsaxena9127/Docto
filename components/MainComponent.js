import React from "react";
import Doctors from "./DoctorsComponent";
import Pharmacy from "./PharmacyComponent";
import DoctorSearch from "./DoctorsearchComponent";
import Pharmacysearch from "./PharmacyseacrhComponent";
import Doctordetail from "./DoctordetailComponent";
import Pharmacydetail from "../components/PharmacydetailComponent";
import Pharmacycart from "../components/PharmacycartComponent";
import Adddoctor from "../components/AdddoctorComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const DoctorNavigator = createStackNavigator({
  DoctorHome: { screen: Doctors },
  Doctordetail: { screen: Doctordetail },
  Search: { screen: DoctorSearch },
  Adddoctor: { screen: Adddoctor }
});

const PharmacyNavigator = createStackNavigator({
  PharmacyHome: { screen: Pharmacy },
  Pharmacydetail: { screen: Pharmacydetail },
  Search: { screen: Pharmacysearch },
  Cart: { screen: Pharmacycart }
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
        }
      }
    }
  }
});

const Main = createAppContainer(MainNavigator);

export default Main;
