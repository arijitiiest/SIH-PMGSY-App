import React from "react";
import {
  Platform,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import AuthScreen from "../screens/Auth/AuthScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

import HomeScreen from "../screens/Road/HomeScreen";
import ReportOptionsScreen from "../screens/Road/ReportOptionsScreen";
import NewReportScreen from "../screens/Road/NewReportScreen";
import MyComplaintsScreen from "../screens/Road/MyComplaintsScreen";
import ProfileScreen from "../screens/Road/ProfileScreen";
import MapScreen from "../screens/Road/MapScreen";
import ComplainRegisterScreen from "../screens/Road/ComplainRegisteredScreen";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    AuthSc: AuthScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    // defaultNavigationOptions: defaultNavOptions,
    headerMode: "none",
  }
);

const HomeNavigator = createStackNavigator(
  {
    HomeSc: HomeScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ReportNavigator = createStackNavigator(
  {
    ReportOptionsSc: ReportOptionsScreen,
    NewReportSc: NewReportScreen,
    Map: MapScreen,
    ComRegSc: ComplainRegisterScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Report Pothole",
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-locate" : "ios-location-sharp"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ComplaintsNavigator = createStackNavigator(
  {
    ComplaintsSc: MyComplaintsScreen,
    MapCp: MapScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "My Complaints",
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-map" : "ios-map"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ProfileNavigator = createStackNavigator(
  {
    ProfileSc: ProfileScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Profile",
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-person" : "ios-person"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const RoadNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    Report: ReportNavigator,
    Complaints: ComplaintsNavigator,
    Profile: ProfileNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 45 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />

            <View style={{ height: 10, paddingTop: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.navigate("Auth");
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 20,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-log-out" : "ios-log-out"
                    }
                    size={23}
                    color="gray"
                  />
                  <View style={{ paddingLeft: 35 }}>
                    <Text
                      style={{ fontFamily: "open-sans-bold", color: "#1f1f1f" }}
                    >
                      Logout
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            /> */}
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Road: RoadNavigator,
});

export default createAppContainer(MainNavigator);
