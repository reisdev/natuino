import React from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ToolbarAndroid
} from "react-native";

import DeviceList from "./src/components/DevicesList";

import BluetoothSerial from "react-native-bluetooth-serial";
import { Icon, Divider, Header } from "react-native-elements";

export default class App extends React.Component {
  btManager = BluetoothSerial;
  constructor(props) {
    super(props);
    this.state = {
      btEnabled: false
    };
  }
  async componentDidMount() {
    const en = await this.btManager.isEnabled();
    this.setState({
      btEnabled: en
    });
    this.btManager.on("bluetoothEnabled", () => {
      this.setState({ btEnabled: true });
    });
    this.btManager.on("bluetoothDisabled", () => {
      this.setState({ btEnabled: false });
    });
  }
  toggleBt = e => {
    if (this.state.btEnabled) this.btManager.disable();
    else this.btManager.enable();
  };
  render() {
    return (
      <View>
        <StatusBar hidden/>
        <Header
          outerContainerStyles={{ height: 56 }}
          backgroundColor={"#0F728F"}
          centerComponent={{
            text: "Natuino",
            style: { color: "white", fontSize: 20 }
          }}
          rightComponent={{
            icon: this.state.btEnabled ? "bluetooth" : "bluetooth-disabled",
            onPress: () => this.toggleBt(),
            color: "white",
            size: 25,
            underlayColor: "transparent"
          }}
        />
        <DeviceList bt={this.btManager} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  toolbar: {
    height: 60,
    backgroundColor: "#0F728F"
  }
});
