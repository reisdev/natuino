import React, { Component } from "react";

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { Button, Card, Icon } from "react-native-elements";

export default class DevicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
  }
  async componentDidMount() {
    if(! await this.props.bt.isConnected()) {
      ToastAndroid.showWithGravityAndOffset("Not connected to any device",2000,ToastAndroid.BOTTOM,0,25)
    }
    this.scanDevice();
  }
  scanDevice = async e => {
    const list = await this.props.bt.discoverUnpairedDevices();
    this.setState({ devices: list });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          rounded
          color={"white"}
          backgroundColor={"#0F728F"}
          buttonStyle={{width: "50%"}}
          textStyle={{flex: 1, alignContent: "center"}}
          onPress={this.scanDevice}
          title={"Scan"}
        />
        <FlatList
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card key={item.id} title={item.name}>
              <Text key={item.id}> ID: {item.id}</Text>
              <Button key={item.id}
                backgroundColor={"#0F728F"} 
                icon={{name: "bluetooth"}} 
                title="Connect"
              />
            </Card>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10
  }
});
