/***************************************************
 *
 *  @Author: Matheus dos Reis <matheusdrdj@gmail.com>
 *  @Date: 15/12/2018
 *  @Description: Main Application component. It have
 *  a Header, the main view and a footer with tabs
 *  to access the main features of the application
 *
 **************************************************/

import React, { useState, useEffect } from "react";

import { StyleSheet, View, StatusBar } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";
import { Header } from "react-native-elements";

import Router from "./src/router";

const App = props => {
  const [btStatus, setBluetoothStatus] = useState(false);
  const btManager = BluetoothSerial;

  const getStatusFromDevice = async () => {
    const status = await btManager.isEnabled();
    setBluetoothStatus(status);
  };

  useEffect(() => {
    getStatusFromDevice();
    btManager.on("bluetoothEnabled", () => {
      setBluetoothStatus(true);
    });
    btManager.on("bluetoothDisabled", () => {
      setBluetoothStatus(false);
    });
  }, []);

  const toggleBt = e => {
    if (!btStatus) btManager.disable();
    else btManager.enable();
  };
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
          icon: btStatus ? "bluetooth" : "bluetooth-disabled",
          onPress: () => toggleBt(),
          color: "white",
          size: 25,
          underlayColor: "transparent"
        }}
      />
      <Router />
    </View>
  );
};

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

export default App;
