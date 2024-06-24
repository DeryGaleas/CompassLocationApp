import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { kelvinToCelsius } from "./utils";

export default function LocationScreen() {
  const [temperature, setTemperature] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=13.304220&lon=-87.179707&appid=a1bef899ca1f271cdf7fb2ebaf2513bb`;
      const response = await fetch(url);
      const data = await response.json();
      const kelvinTemp = data.main.temp;
      const celsiusTemp = kelvinToCelsius(kelvinTemp);
      console.log(celsiusTemp);
      console.log("Tyoe of celsiusTemp", typeof celsiusTemp);
      setTemperature(`${celsiusTemp}° Celsius`);

      //console.log(data);
    };
    fetchData();
  }, [location]);

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
      <MapView style={styles.map} region={coordinates}>
        <Marker coordinate={coordinates} title={temperature} />
      </MapView>
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
