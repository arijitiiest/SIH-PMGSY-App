import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam("myLocation");
  const readonly = props.navigation.getParam("realTime");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapRegion, setMapRegion] = useState({
    latitude: initialLocation.lat,
    longitude: initialLocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  const savePickedLocationHandler = useCallback(() => {
    console.log(selectedLocation);
    props.navigation.state.params.changeLocation(selectedLocation);
    props.navigation.goBack();
  }, [selectedLocation]);

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
      // onRegionChange={(region) => setMapRegion(region)}
      onRegionChangeComplete={(region) => setMapRegion(region)}
    >
      <Marker title="Road Location" coordinate={markerCoordinates}></Marker>
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("realTime");
  if (readOnly) {
    return {
      headerTitle: "Map View",
    };
  }

  return {
    headerTitle: "Map View",
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;