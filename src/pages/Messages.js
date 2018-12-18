import React, { Component } from "react";

import { View, Text, FlatList, StyleSheet } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";

class Messages extends Component {
  bt = BluetoothSerial;
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  async componentDidMount() {
    BluetoothSerial.withDelimiter("\n").then(res => {
      console.log("delimiter setup", res);
      this.bt.on("read", message => {
        const newMsg = {
          message,
          time: new Date().toTimeString().split(" ")[0]
        };
        this.setState({ messages: [...this.state.messages, newMsg] });
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.messages}
          keyExtractor={(msg, index) => `msg-${index}`}
          contentContainerStyle={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <Text style={{ color: "white" }}>
              {item.time} : {item.message.data}
            </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});

export default Messages;
