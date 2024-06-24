import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Magnetometer } from "expo-sensors";

const Compass = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(200);

    const subscription = Magnetometer.addListener((data) => {
      const angle = calculateHeading(data.x, data.y);
      setHeading(angle);
    });

    return () => subscription.remove();
  }, []);

  const calculateHeading = (x, y) => {
    console.log(x, y);
    let heading = Math.atan(y / x);
    heading = heading * (180 / Math.PI); // Convert to degrees
    if (x < 0) {
      heading += 180;
    } else if (y < 0) {
      heading += 360;
    }
    return Math.round(heading);
  };

  return (
    <View style={styles.container}>
      <Text>{heading}</Text>
      <Image
        source={require("./assets/compass.png")}
        style={[
          styles.compass,
          { transform: [{ rotate: `${360 - heading}deg` }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    width: 300,
    height: 300,
  },
});

export default Compass;
