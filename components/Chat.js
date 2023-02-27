import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAo-uWRRrp3gtYYDeEpgBM24Vux1K1YOKk",
  authDomain: "chat-app-fe670.firebaseapp.com",
  projectId: "chat-app-fe670",
  storageBucket: "chat-app-fe670.appspot.com",
  messagingSenderId: "649726935485",
  appId: "1:649726935485:web:0aee1e65f0fa919d0292d4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        avatar: "",
        name: "",
      },
      loggedInText: "Authenticating, please wait...",
    };
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
        loggedInText: name + " has entered the chat",
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          avatar: data.user.avatar,
          name: data.user.name,
        },
      });
    });
    this.setState({ messages });
  };

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  };

  // Called when user sends a message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage(messages);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6495ED",
          },
        }}
      />
    );
  }

  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {this.state.loggedInText}
        </Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: name,
            avatar: "https://picsum.photos/140",
          }}
        />
        {/* Input field won’t be hidden beneath the keyboard on Android */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
