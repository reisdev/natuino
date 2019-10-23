import React from "react";

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import { ToolbarAndroid } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";

import DevicesList from "./components/DevicesList";
import Messages from "./pages/Messages";

const BtSerial = BluetoothSerial;

const tabs = {
  Home: {
    screen: DevicesList,
    path: "Home"
  },
  Messages: {
    screen: Messages,
    path: "Messages"
  }
};

const navigator = createBottomTabNavigator(tabs, {
  initialRouteName: "Home",
  swipeEnabled: true,
  navigationOptions: {
    headerStyle: {
      padding: 10
    }
  },
  tabBarOptions: {
    showIcon: true,
    style: {
      backgroundColor: "#0F728F",
      padding: 5
    },
    activeTintColor: "white",
    inactiveTintColor: "white"
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let icon;
      switch (routeName) {
        case "Home":
          icon = "home";
          break;
        case "Messages":
          icon = "message-text";
          break;
        default:
          icon = "";
          break;
      }
      return (
        <Icon
          type="material-community"
          name={focused ? icon : icon + "-outline"}
          color="white"
        />
      );
    },
    tabBarPosition: "bottom"
  })
});

export default createAppContainer(navigator);
