/***************************************************
 *
 *  @Author: Matheus dos Reis <matheusdrdj@gmail.com>
 *  @Date: 15/12/2018
 *  @Description: Main Application component. It have
 *  a Header, the main view and a footer with tabs
 *  to access the main features of the application
 *
 **************************************************/

import React from "react";

import { StyleSheet, View, StatusBar, ToolbarAndroid } from "react-native";

import DeviceList from "./src/components/DevicesList";

import BluetoothSerial from "react-native-bluetooth-serial";
import { Header, Icon } from "react-native-elements";

export default class App extends React.Component {
  btManager = BluetoothSerial;
  constructor(props) {
    super(props);
    this.state = {
      btStatus: false
    };
  }
  async componentDidMount() {
    const status = await this.btManager.isEnabled();
    this.setState({
      btStatus: status
    });
    this.btManager.on("bluetoothEnabled", () => {
      this.setState({ btStatus: true });
    });
    this.btManager.on("bluetoothDisabled", () => {
      this.setState({ btStatus: false });
    });
  }
  toggleBt = e => {
    if (this.state.btStatus) this.btManager.disable();
    else this.btManager.enable();
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Header
          outerContainerStyles={{ height: 56 }}
          backgroundColor={"#0F728F"}
          centerComponent={{
            text: "Natuino",
            style: { color: "white", fontSize: 20 }
          }}
          rightComponent={{
            icon: this.state.btStatus ? "bluetooth" : "bluetooth-disabled",
            onPress: () => this.toggleBt(),
            color: "white",
            size: 25,
            underlayColor: "transparent"
          }}
        />
        <DeviceList bt={this.btManager} />
        <Header
          backgroundColor={"#0F728F"}
          outerContainerStyles={{ height: 56}}
        >
          <Icon name="home" color="white" />
          <Icon name="dashboard" color="white"/>
          <Icon name="message" color="white"/>
          <Icon name="settings" color="white"/>
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 3,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginBottom: -2,
    paddingBottom: -2
  }
});
