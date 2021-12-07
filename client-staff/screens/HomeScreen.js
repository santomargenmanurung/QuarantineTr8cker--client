import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to QR SCANNER"
        onPress={() => navigation.navigate("QRScanner", {screen: "QRScanner"})}
      >
        Go to QRScanner
      </Button>
    </View>
  );
}