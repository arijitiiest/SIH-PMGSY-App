import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import { LOGO } from "../../assets/images";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import * as authActions from "../../store/actions/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const LoginScreen = (props) => {
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
    },
    inputValidities: {
      username: "",
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    setError(null);
    setISLoading(true);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.username,
          formState.inputValues.password
        )
      );
      setISLoading(false);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
      setISLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={{ width: "100%", height: "100%" }} source={LOGO} />
      </View>
      <Text
        style={{ ...styles.text, color: Colors.primary, letterSpacing: 1.5 }}
      >
        LOGIN
      </Text>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="username"
            label="Username"
            keyboardType="default"
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a username."
            onInputChange={inputChangeHandler}
            initialValue=""
          />

          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />

          <View style={styles.dialogue}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            >
              <Text style={{ fontFamily: "open-sans", color: Colors.primary }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={authHandler}>
                <Text style={{ ...styles.text, fontSize: 17, color: "white" }}>
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dialogue}>
            <Text style={{ fontFamily: "open-sans" }}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  color: Colors.primary,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
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
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 21,
  },
  authContainer: {
    width: "85%",
    maxWidth: Dimensions.get("screen").width - 30,
    maxHeight: 400,
    padding: 20,
    margin: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  button: {
    width: Dimensions.get("screen").width - 150,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogue: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
  },
});

export default LoginScreen;
