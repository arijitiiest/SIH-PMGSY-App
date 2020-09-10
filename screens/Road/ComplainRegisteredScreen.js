import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ComplainRegisterScreen = (props) => {
  const imageUri = props.navigation.getParam("imageUri");
  //   const imageUri =
  //     "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540arijitiiest%252FPMGSY/ImagePicker/bc9769d1-cc5a-4276-8819-85d6801a7c41.jpg";
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: imageUri }}
            />
          </View>

          <View style={styles.complaintHeader}>
            <Text style={styles.complaintText}>Complaint Registered!</Text>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.descText}>
              Thank you for submitting the report. A concerned authority will
              get back to you. You can find the new report and monitor it's
              status in the My Complaints section.
            </Text>
            <Text style={styles.descText}>
              Keep a track of your report and feel free to exchange more
              thoughts with the concerned authority too. You can even mail us to
              "support.pmgsy@gmail.com" for more queries.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.gotoContainer}
            onPress={() => props.navigation.navigate("ComplaintsSc")}
          >
            <Text style={styles.gotoText}>GO TO MY COMPLAINTS</Text>
          </TouchableOpacity>
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

ComplainRegisterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Complaint Registered",
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
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  container: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: Colors.bg,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "95%",
    height: 200,
  },
  complaintHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 10,
  },
  complaintText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
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
    paddingVertical: 5,
  },
  gotoContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 80,
  },
  gotoText: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    color: Colors.primary,
  },
});

export default ComplainRegisterScreen;
