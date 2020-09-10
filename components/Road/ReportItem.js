import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Fontisto, FontAwesome5, Entypo } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReportItem = (props) => {
  const {
    id,
    createdAt,
    imageUri,
    lat,
    lng,
    predictedImage,
    roadCondition,
    roadName,
    status,
  } = props.data;

  const locationShowHandler = () => {
    props.navigation.navigate("MapCp", {
      myLocation: { lat: parseFloat(lat), lng: parseFloat(lng) },
      realTime: true,
    });
  };

  const renderStatus = () => {
    switch (status.toString()) {
      case "1":
        return (
          <View>
            <View
              style={{
                ...styles.statusCircle,
                backgroundColor: Colors.primary,
              }}
            >
              <Entypo name="pencil" size={26} color="white" />
            </View>
            <Text style={styles.statusText}>Submitted</Text>
          </View>
        );

      case "2":
        return (
          <View>
            <View
              style={{
                ...styles.statusCircle,
                backgroundColor: Colors.primary,
              }}
            >
              <FontAwesome5 name="check-double" size={24} color="white" />
            </View>
            <Text style={{ ...styles.statusText, paddingLeft: 18 }}>
              Approved
            </Text>
          </View>
        );

      case "3":
        return (
          <View>
            <View
              style={{ ...styles.statusCircle, backgroundColor: Colors.accent }}
            >
              <FontAwesome5 name="exclamation" size={26} color="white" />
            </View>
            <Text
              style={{
                ...styles.statusText,
                paddingLeft: 23,
                color: Colors.accent,
              }}
            >
              Rejected
            </Text>
          </View>
        );

      case "4":
        return (
          <View>
            <View
              style={{
                ...styles.statusCircle,
                backgroundColor: Colors.primary,
                marginLeft: 35,
              }}
            >
              <FontAwesome5 name="people-carry" size={26} color="white" />
            </View>
            <Text style={styles.statusText}>Work in Progress</Text>
          </View>
        );

      case "5":
        return (
          <View>
            <View
              style={{
                ...styles.statusCircle,
                backgroundColor: Colors.primary,
              }}
            >
              <Entypo name="emoji-happy" size={26} color="white" />
            </View>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        );

      default:
        return (
          <View>
            <View
              style={{
                ...styles.statusCircle,
                backgroundColor: Colors.primary,
              }}
            >
              <Entypo name="pencil" size={26} color="white" />
            </View>
            <Text style={styles.statusText}>Submitted</Text>
          </View>
        );
    }
  };

  return (
    <View styles={styles.container}>
      <View style={styles.reportContainer}>
        <Text style={styles.reportText}>Report # {id}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: predictedImage,
          }}
        />
      </View>

      <View style={styles.roadNameContainer}>
        <FontAwesome5 name="road" size={23} color={Colors.primary} />
        <Text style={styles.roadName}>{roadName}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Fontisto name="date" size={23} color={Colors.primary} />
        <Text style={styles.dataText}>
          {createdAt.toString().substring(0, 10)}
        </Text>
      </View>

      <View style={styles.locationTitleContainer}>
        <Text style={styles.locationTitleText}>(Location of the road)</Text>
      </View>

      <View style={styles.locationContainer}>
        <TouchableOpacity
          style={styles.locationTextContainer}
          onPress={locationShowHandler}
        >
          <FontAwesome5
            name="map-marker-alt"
            size={30}
            color={Colors.primary}
          />
          <Text style={styles.loactionText}>
            Lat: {lat.toString().substring(0, 5)}
          </Text>
          <Text style={styles.loactionText}>
            Lng: {lng.toString().substring(0, 5)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status</Text>
        {statusComp}
      </View> */}

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status</Text>
        {renderStatus()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reportContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.bg,
  },
  reportText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primary,
  },
  imageContainer: {
    width: Dimensions.get("screen").width - 40,
    height: 200,
    overflow: "hidden",
    padding: 7,
    backgroundColor: Colors.bg,
  },
  roadNameContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.bg,
    padding: 15,
    paddingLeft: 25,
  },
  roadName: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    paddingLeft: 15,
    color: Colors.primary,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.bg,
    padding: 15,
    paddingTop: 0,
    paddingLeft: 25,
  },
  dataText: {
    fontFamily: "open-sans",
    paddingLeft: 15,
    paddingTop: 2,
    color: Colors.primary,
  },
  locationTitleContainer: {
    // paddingLeft: 15,
    backgroundColor: Colors.bg,
    display: "flex",
    alignItems: "center",
  },
  locationTitleText: {
    fontFamily: "open-sans",
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.primary,
  },
  // locationContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   backgroundColor: Colors.bg,
  //   padding: 15,
  //   paddingTop: 0,
  //   paddingLeft: 25,
  // },
  locationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
    padding: 15,
    paddingTop: 0,
    paddingLeft: 0,
  },
  locationTextContainer: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 25,
    backgroundColor: "white",
    // padding: 15,
    // paddingTop: 0,
    // paddingLeft: 25,
  },
  loactionText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
    paddingLeft: 10,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
    padding: 15,
    paddingLeft: 25,
  },
  statusTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.primary,
    top: -10,
  },
  statusCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accent,
    marginLeft: 25,
  },
  statusText: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: Colors.primary,
    paddingLeft: 14,
  },
});

export default ReportItem;
