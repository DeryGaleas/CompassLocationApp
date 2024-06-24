import { useForegroundPermissions } from "expo-location";
import React, { useCallback, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Permissions() {
  const [permission, askPermission] = useForegroundPermissions();
  const navigation = useNavigation();

  const onContinue = useCallback(() => {
    console.log("Continue");
    navigation.navigate("Home");
  }, []);

  /*
  useEffect(() => {
    // Only redirect on first render or permission change,
    // not when users go back to this screen.
    if (permission?.granted) {
      console.log("Permissions Granted");
      onContinue();
    }
  }, [permission?.granted]);
*/

  if (permission?.granted) {
    return (
      <View>
        <View>
          <Text>Permissions granted</Text>
          <Text>
            To monitor your office marathon, we need access to your location.
          </Text>
        </View>
        <Button onPress={onContinue} title="Go Next Screen"></Button>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>We need your permission</Text>
        <Text>To get your location we need permission</Text>
      </View>
      {!permission ? (
        <Text>Hey Spinner</Text>
      ) : (
        <Button onPress={askPermission} title="Grant Permission"></Button>
      )}
    </View>
  );
}
