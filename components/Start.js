import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const image = require("../assets/background-image.png");

const colors = {
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#8A95A5" },
  green: { backgroundColor: "#B9C6AE" },
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" };
  }

  render() {
    const { black, purple, grey, green } = colors;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={image}
          style={[styles.container, styles.image]}
        >
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.inputBox}>
            <TextInput
              accessible={true}
              accessibilityLabel="Enter your name"
              accessibilityHint="Enter your name here"
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />
            <View style={styles.colorPickerWrapper}>
              <Text style={styles.colorPickerText}>
                Choose Background Color:
              </Text>
              <View style={styles.colorPicker}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    black,
                    this.state.color === black.backgroundColor
                      ? styles.selectedColor
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: black.backgroundColor })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    purple,
                    this.state.color === purple.backgroundColor
                      ? styles.selectedColor
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: purple.backgroundColor })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    grey,
                    this.state.color === grey.backgroundColor
                      ? styles.selectedColor
                      : {},
                  ]}
                  onPress={() => this.setState({ color: grey.backgroundColor })}
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    green,
                    this.state.color === green.backgroundColor
                      ? styles.selectedColor
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: green.backgroundColor })
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start chatting"
              accessibilityHint="Enter the chat room"
              accessibilityRole="button"
              style={styles.chatButton}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.chatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    marginTop: 80,
  },

  inputBox: {
    height: "44%",
    width: "88%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    opacity: 0.9,
  },

  nameInput: {
    height: 50,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    height: 50,
    borderColor: "#757083",
    borderWidth: 1,
    borderRadius: 2,
    width: "88%",
    opacity: 1,
    paddingLeft: 10,
  },

  colorPickerWrapper: {
    alignSelf: "flex-start",
    paddingLeft: 22,
  },

  colorPicker: {
    flexDirection: "row",
  },

  colorPickerText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },

  color: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    margin: 20,
    marginVertical: 10,
    marginLeft: 0,
  },

  selectedColor: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#757083",
  },

  chatButton: {
    backgroundColor: "#757083",
    width: "88%",
    height: 50,
    justifyContent: "center",
  },

  chatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
