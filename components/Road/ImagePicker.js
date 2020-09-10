import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import Colors from "../../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [myLocation, setMyLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION
    );
    if (result.status != "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera and location permission to use this app.",
        [{ text: "Okey" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const locationNow = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      setMyLocation(locationNow);
    } catch (err) {
      Alert.alert("Could not fetch location", "Please try again later", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  const takeImageHander = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let image;
    if (props.realTime) {
      image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        //   aspect: [16, 9],
        quality: 0.5,
      });
    } else {
      image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
    }

    getLocationHandler();

    if (!image.cancelled) {
      setPickedImage(image.uri);
    }
  };

  useEffect(() => {
    if (!myLocation) {
      setPickedImage();
    }
  }, [myLocation]);

  useEffect(() => {
    props.onImageTaken(pickedImage);
  }, [pickedImage]);

  useEffect(() => {
    props.onLocationTaken(myLocation);
  }, [myLocation]);

  return (
    <View style={styles.imagePicker}>
      {isFetching ? (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.imagePreview}>
          {!pickedImage ? (
            <Text style={styles.text}>No image, Please Pick an Image</Text>
          ) : (
            <Image style={styles.image} source={{ uri: pickedImage }} />
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={takeImageHander}
        style={styles.imageButtonContainer}
      >
        {props.realTime ? (
          <Text style={styles.imageButton}>Capture Image</Text>
        ) : (
          <Text style={styles.imageButton}>Pick From File</Text>
        )}
      </TouchableOpacity>

      {/* <Button
        title={props.realTime ? "" : ""}
        color={Colors.primary}
        onPress={takeImageHander}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "90%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  activity: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: Colors.primary,
  },
  imageButtonContainer: {
    width: 180,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
  },
  imageButton: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.primary,
  },
});

export default ImgPicker;
