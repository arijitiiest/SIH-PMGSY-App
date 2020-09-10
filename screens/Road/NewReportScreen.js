import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import ImagePicker from "../../components/Road/ImagePicker";
import Colors from "../../constants/Colors";
import * as RoadActions from "../../store/actions/road";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewReportScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [roadName, setRoadName] = useState("");
  const [roadDesc, setRoadDesc] = useState("");
  const [imageUri, setImageUri] = useState();
  const [myLocation, setMyLocation] = useState();
  const dispatch = useDispatch();

  const roadNameChangeHandler = (name) => {
    setRoadName(name);
  };

  const imageTakenHandler = (imagePath) => {
    setImageUri(imagePath);
  };

  const locationTakenHandler = (location) => {
    setMyLocation(location);
  };

  const roadDescChangeHandler = (desc) => {
    setRoadDesc(desc);
  };

  const locationShowHandler = () => {
    props.navigation.navigate("Map", {
      myLocation: myLocation,
      realTime: props.navigation.getParam("realTime"),
      changeLocation: (data) => {
        console.log(data);
        setMyLocation(data);
      },
    });
  };

  const submitHandler = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(
        RoadActions.addRoad(roadName, roadDesc, imageUri, myLocation, props.navigation.getParam("realTime"))
      );
      setIsLoading(false);
      props.navigation.navigate("ComRegSc", { imageUri: imageUri });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }, [dispatch, roadName, roadDesc, imageUri, myLocation]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 15,
            color: Colors.primary,
          }}
        >
          Something went wrong!
        </Text>
        <Button
          title="Try again"
          onPress={() => props.navigation.goBack()}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Report Card</Text>
          </View>
          <ImagePicker
            onImageTaken={imageTakenHandler}
            onLocationTaken={locationTakenHandler}
            realTime={props.navigation.getParam("realTime")}
          />

          <View style={{ ...styles.headerContainer, paddingBottom: 5 }}>
            <Text style={{ ...styles.headerText, fontSize: 21 }}>
              Create a Report
            </Text>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.descText}>
              We will identify potholes from the image you provided. Please fill
              the rest of the details to file an official complaint. Once you
              create a report and it gets approved you cannot cancel the request
              made untill resolved by the concerned authority. Don't forgot to
              add supporting comments to your report
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Tag Pothole's Location</Text>
          </View>

          <TouchableOpacity
            style={styles.locationContainer}
            onPress={locationShowHandler}
          >
            {props.navigation.getParam("realTime") ? (
              <Text style={styles.locationText}>Preview My Location</Text>
            ) : (
              <Text style={styles.locationText}>Pick Location</Text>
            )}
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Add Road Name</Text>
          </View>
          <View style={styles.roadNameContainer}>
            <TextInput
              label="Road Name"
              value={roadName}
              mode="outlined"
              onChangeText={roadNameChangeHandler}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Add Comments</Text>
          </View>
          <View style={styles.roadNameContainer}>
            <TextInput
              label="Additional Comments (Required)*"
              value={roadDesc}
              mode="outlined"
              onChangeText={roadDescChangeHandler}
            />
          </View>
          <View style={styles.submitCancelContainer}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={submitHandler}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

NewReportScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "New Report",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: Colors.bg,
    paddingVertical: 20,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  headerText: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    color: Colors.primary,
  },
  descContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 0,
  },
  descText: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: Colors.primary,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 10,
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
    color: Colors.primary,
  },
  locationContainer: {
    width: 180,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
    marginLeft: 70,
  },
  locationText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.primary,
  },
  roadNameContainer: {
    margin: 20,
    marginTop: 0,
  },
  submitCancelContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  submitContainer: {
    width: 130,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
  },
  submitText: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    color: Colors.primary,
  },
  cancelContainer: {
    width: 130,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
  },
  cancelText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.accent,
  },
});

export default NewReportScreen;
