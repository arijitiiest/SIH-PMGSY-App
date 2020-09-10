import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import { PM } from "../../assets/images";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.dataContainer}>
          <View style={styles.imageContainer}>
            <Image source={PM} style={{ width: "100%", height: "100%" }} />
          </View>
          <View style={styles.topDataContainer}>
            <Text style={styles.topDataText}>
              PRADHAN MANTRI GRAM SADAK YOJANA App
            </Text>
            <Text style={{ ...styles.topDataText, fontSize: 14 }}>
              Citizen Feedback System
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.topDataText, fontSize: 14, color: Colors.bg }}>
              No. of Complaints Registered : 173,388
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.topDataText, fontSize: 14, color: Colors.bg }}>
              No of works cleared : 120,765
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.topDataText, fontSize: 14, color: Colors.bg }}>
              In-progress road works : 16,616
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.topDataText, fontSize: 14, color: Colors.bg }}>
              Completed Length (Kms) : 623,430 Km
            </Text>
          </View>
        </View>

        <View style={styles.descTextContainer}>
          <Text style={styles.descText}>
            {"    "}
            The Pradhan Mantri Gram Sadak Yojana (PMGSY), was launched by the
            Govt. of India to provide connectivity to unconnected Habitations as
            part of a poverty reduction strategy. Govt. of India is endeavoring
            to set high and uniform technical and management standards and
            facilitating policy development and planning at State level in order
            to ensure sustainable management of the rural roads network.
            According to latest figures made available by the State Governments
            under a survey to identify Core Network as part of the PMGSY
            programme, about 1.67 lakh Unconnected Habitations are eligible for
            coverage under the programme. This involves construction of about
            3.71 lakh km. of roads for New Connectivity and 3.68 lakh km.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props.navigation.navigate("Report");
        }}
        style={styles.touchableOpacityStyle}
      >
        <AntDesign name="pluscircle" size={50} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "PMGSY",
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
    backgroundColor: Colors.bg,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  dataContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: Colors.homeBg,
    paddingBottom: 40,
  },
  topDataContainer: {
    backgroundColor: Colors.homeBg,
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 20,
  },
  topDataText: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    color: Colors.textColor,
  },
  infoContainer: {
    display: "flex",
    alignItems: "flex-start",
    paddingVertical: 2,
  },

  imageContainer: {
    width: Dimensions.get("screen").width - 10,
    height: 250,
    paddingVertical: 5,
  },
  descTextContainer: {
    padding: 10,
  },
  descText: {
    fontFamily: "open-sans",
  },
});

export default HomeScreen;
