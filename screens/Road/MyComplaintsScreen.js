import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import ReportItem from "../../components/Road/ReportItem";
import * as RoadActions from "../../store/actions/road";

const MyComplaintsScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const myRoadsData = useSelector((state) => state.road.roads);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(RoadActions.fetchRoads());
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadData().then(() => {
      setIsRefreshing(false);
    });
  }, [isRefreshing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadData);
    return () => {
      willFocusSub.remove();
    };
  }, [loadData]);

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
        <Button title="Try again" onPress={loadData} color={Colors.primary} />
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
      {myRoadsData.length !== 0 ? (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          data={myRoadsData}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <ReportItem
                data={itemData.item}
                navigation={props.navigation}
                onSelect={() => {
                  props.navigation.navigate("RoadDetail", {
                    roadId: itemData.item.id,
                  });
                }}
              />
            );
          }}
        />
      ) : (
        <View style={styles.noComplainContainer}>
          <Text style={styles.noComplainText}>No Complaints</Text>
        </View>
      )}

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

MyComplaintsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All My Complaints",
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
    // width: Dimensions.get("screen").width - 30,
    // backgroundColor: Colors.bg,
  },
  complaintsText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primary,
    paddingLeft: 15,
  },
  noComplainContainer: {
    height: Dimensions.get("screen").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noComplainText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primary,
  },
});

export default MyComplaintsScreen;
