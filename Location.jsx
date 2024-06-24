import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let coordinates = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    coordinates.latitude = location.coords.latitude;
    coordinates.longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={coordinates}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
