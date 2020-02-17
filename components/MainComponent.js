import React from "react";
import Doctors from "./DoctorsComponent";
import Pharmacy from "./PharmacyComponent";
import Search from "./SearchComponent";
import Doctordetail from "./DoctordetailComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const DoctorNavigator = createStackNavigator({
  DoctorHome: { screen: Doctors },
  Doctordetail: { screen: Doctordetail },
  Search: { screen: Search }
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
          backgroundColor: "#f9f9f9"
        },
        style: {
          borderTopColor: "#f9f9f9"
        }
      }
    }
  },
  About: {
    screen: Pharmacy,
    navigationOptions: {
      tabBarLabel: "Pharmacy",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cart-plus" color={tintColor} size={25} />
      ),
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#f9f9f9"
        },
        style: {
          borderTopColor: "#f9f9f9"
        }
      }
    }
  }
});

const Main = createAppContainer(MainNavigator);

export default Main;
