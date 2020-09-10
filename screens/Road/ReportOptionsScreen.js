import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome5 } from "@expo/vector-icons";

import HeaderButton from "../../components/UI/HeaderButton";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReportOptionsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.HeaderText}>Spot and Report</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome5
              name={
                Platform.OS === "android" ? "map-marked-alt" : "map-marked-alt"
              }
              size={40}
              color="black"
            />
            <Text style={{ ...styles.HeaderText, paddingLeft: 10 }}>
              {" "}
              Potholes Now
            </Text>
          </View>
        </View>

        <View style={styles.descContainer}>
          <Text style={styles.descText}>
            Choose between either uploading a photo from the file system or
            using the camera to click a real time photo with live location.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <Card style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.touchCard}
              onPress={() => {
                props.navigation.navigate("NewReportSc", { realTime: true });
              }}
            >
              <FontAwesome5
                name={Platform.OS === "android" ? "image" : "image"}
                size={100}
                color="gray"
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Upload From Camera</Text>
              </View>
            </TouchableOpacity>
          </Card>
          <Card style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.touchCard}
              onPress={() => {
                props.navigation.navigate("NewReportSc", { realTime: false });
              }}
            >
              <FontAwesome5
                name={Platform.OS === "android" ? "images" : "image"}
                size={100}
                color="gray"
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Upload From File Manager</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </View>
  );
};

ReportOptionsScreen.navigationOptions = (navData) => {
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
  container: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: Colors.bg,
    paddingVertical: 50,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
  },
  HeaderText: {
    fontFamily: "open-sans",
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.primary,
  },
  descContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    paddingTop: 10,
  },
  descText: {
    fontFamily: "open-sans",
    fontSize: 17,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 50,
  },
  touchCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bgLite,
    paddingTop: 10,
  },
  cardTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  cardText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.primary,
    textAlign: "center",
  },
});

export default ReportOptionsScreen;
