/***************************************************
 *
 *  @Author: Matheus dos Reis <matheusdrdj@gmail.com>
 *  @Date: 15/12/2018
 *  @Description: Component to list the Available BT
 *  devices, paired or not.
 *
 **************************************************/

import React, { Component } from "react";

import {
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { Button, List, ListItem } from "react-native-elements";

import BluetoothSerial from "react-native-bluetooth-serial";

const ListModel = props => (
  <View>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 20,
        paddingLeft: 15
      }}
    >
      {props.title}
    </Text>
    <List>
      {props.devices.map(item => (
        <ListItem
          containerStyle={{
            backgroundColor: props.deviceId === item.id ? "green" : "white"
          }}
          key={item.id}
          onPressRightIcon={e => props.connect(item)}
          rightIcon={{ name: "bluetooth" }}
          title={item.name}
          subtitle={`ID: ${item.id}`}
        />
      ))}
    </List>
  </View>
);

class DevicesList extends Component {
  bt = BluetoothSerial
  constructor(props) {
    super(props);
    this.state = {
      paired: [],
      unpaired: [],
      deviceId: 0,
      deviceName: ""
    };
  }
  async componentDidMount() {
    this.scanDevice();
  }
  scanDevice = async e => {
    const unpaired = await this.bt.discoverUnpairedDevices();
    const paired = await this.bt.list();
    this.setState({ paired, unpaired });
  };
  connect = device => {
    this.bt
      .connect(device.id)
      .then(res => {
        this.setState({ deviceId: device.id, deviceName: device.name });
      })
      .catch(error => {
        ToastAndroid.showWithGravityAndOffset(
          `Connection error: Device not available`,
          6000,
          ToastAndroid.BOTTOM,
          0,
          25
        );
      });
  };

  disconnect = () => {
    this.bt
      .disconnect()
      .then(res => {
        this.setState({ deviceId: 0, deviceName: "" });
      })
      .catch(error => {
        ToastAndroid.showWithGravityAndOffset(
          `Error: Not possible to disconnect`,
          6000,
          ToastAndroid.BOTTOM,
          0,
          25
        );
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            marginBottom: 10
          }}
        >
          <Button
            color={"white"}
            backgroundColor={"#0F728F"}
            small
            onPress={this.scanDevice}
            title={"Scan"}
          />
          <Button
            disabled={this.state.deviceId === 0}
            color={"white"}
            backgroundColor={"#0F728F"}
            small
            onPress={this.disconnect}
            title={"Disconnect"}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
          }}
        >
          <ListModel
            title={"Paired devices"}
            devices={this.state.paired}
            connect={this.connect}
            deviceId={this.state.deviceId}
          />
          <ListModel
            title={"Available devices"}
            devices={this.state.unpaired}
            connect={this.connect}
            deviceId={this.state.deviceId}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 15
  }
});

export default DevicesList;
