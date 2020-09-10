import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { CON } from "../../assets/images";

const ProfileScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("a");
  const [userName, setUserName] = useState("a");
  const [roads, setRoads] = useState([]);
  const [sub, setSubmitted] = useState(0);
  const [appr, setApproved] = useState(0);
  const [comp, setCompleted] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const profileResponce = await fetch(
        "http://192.168.42.93:8000/api/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token.toString(),
          },
        }
      );

      if (!profileResponce.ok) {
        throw new Error("Something went wrong");
      }

      const profile = await profileResponce.json();
      setEmail(profile.email);
      setUserName(profile.username);

      const roadsResponce = await fetch(
        "http://192.168.42.93:8000/api/roads",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token.toString(),
          },
        }
      );

      if (!roadsResponce.ok) {
        const errorData = await roadsResponce.json();
        console.log(errorData);
        throw new Error("Something went wrong");
      }

      const roads = await roadsResponce.json();
      let submitted = 0,
        approved = 0,
        completed = 0;

      for (const road in roads) {
        if (roads[road].status.toString() == "2") {
          approved++;
        } else if (roads[road].status.toString() == "5") {
          completed++;
        }
        submitted++;
      }

      setSubmitted(submitted);
      setApproved(approved);
      setCompleted(completed);
      setRoads(roads);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 15,
            color: Colors.textColor,
          }}
        >
          An error occurred!
        </Text>
        <Button
          title="Try again"
          onPress={loadData}
          color={Colors.primaryColor}
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
          <View style={styles.profilePic}>
            <Text style={styles.profilePicText}>
              {userName.toString()[0].toUpperCase()}
            </Text>
          </View>

          <View style={styles.profileInfoContainer}>
            <Text style={{ ...styles.profileInfoText, fontSize: 18 }}>
              {userName}
            </Text>
            <Text style={{ ...styles.profileInfoText, fontSize: 15 }}>
              {email}
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: Colors.primary,
              borderBottomWidth: 2,
              width: "100%",
              marginVartical: 10,
            }}
          ></View>

          <View style={styles.statusContainer}>
            <View style={styles.statusTextContainer}>
              <Text style={{ ...styles.statusText, fontSize: 15 }}>
                Submitted
              </Text>
              <Text style={{ ...styles.statusText, fontSize: 15 }}>{sub}</Text>
            </View>
            <View style={styles.statusTextContainer}>
              <View style={styles.statusTextContainer}>
                <Text style={{ ...styles.statusText, fontSize: 15 }}>
                  Approved
                </Text>
                <Text style={{ ...styles.statusText, fontSize: 15 }}>
                  {appr}
                </Text>
              </View>
            </View>
            <View style={styles.statusTextContainer}>
              <View style={styles.statusTextContainer}>
                <Text style={{ ...styles.statusText, fontSize: 15 }}>
                  Completed
                </Text>
                <Text style={{ ...styles.statusText, fontSize: 15 }}>
                  {comp}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.imageConatinerConatiner}>
            <View style={styles.imageConatiner}>
              <Image source={CON} style={{ width: "100%", height: "100%" }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Profile",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 20,
    backgroundColor: Colors.bg,
    width: Dimensions.get("screen").width - 40,
  },
  profilePic: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
  },
  profilePicText: {
    fontFamily: "open-sans-bold",
    fontSize: 80,
    color: "white",
  },
  profileInfoContainer: {
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
  },
  statusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
  },
  statusTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 5,
  },
  statusText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
    paddingVertical: 7,
  },
  imageConatinerConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageConatiner: {
    display: "flex",
    width: 200,
    height: 200,
    borderRadius: 25,
  },
});

export default ProfileScreen;
