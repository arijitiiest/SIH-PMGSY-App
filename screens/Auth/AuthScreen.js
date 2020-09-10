import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { LOGO } from "../../assets/images";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={{ width: "100%", height: "100%" }} source={LOGO} />
      </View>
      <Text style={{ ...styles.text, color: Colors.primary }}>Welcome to PMGSY</Text>
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          style={{ ...styles.button, backgroundColor: Colors.primary }}
        >
          <Text style={{ ...styles.text, color: "white" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Register");
          }}
          style={{ ...styles.button, backgroundColor: "white" }}
        >
          <Text style={{ ...styles.text, color: Colors.primary }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
  },
  imageContainer: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    width: Dimensions.get("screen").width - 100,
    height: 50,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});

export default AuthScreen;
