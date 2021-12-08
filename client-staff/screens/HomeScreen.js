import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { VStack, Center, Heading, Box, Icon, Pressable, Circle } from "native-base"
import LottieView from 'lottie-react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons"


export default function HomeScreen({ navigation }) {
  return (
    <VStack space={4} alignItems="center">
      <Heading textAlign="center" mb="10" pt="10">
        hi, Denis Irawan
      </Heading>
      <Box w="90%" h="60%" p="10" backgroundColor="white" rounded="md" shadow={1}>
        <LottieView source={require('../assets/lottie-qr-scan.json')} autoPlay loop />
      </Box>
      <Pressable
        _pressed={{ transform: [{ scale: 0.9 }] }}
        onPress={() => navigation.navigate("QRScanner", {screen: "QRScanner"})}
      >
        <Circle size={98} bg="#193498" shadow={3}>
          <Icon as={<Ionicons name="qr-code" />} color="white" size={12} />
        </Circle>
      </Pressable>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "aliceblue",
  },
  lottieView: {
    flex: 2,
    width: '100%'
  },
  scannerButton: {
    flex: 1,
    backgroundColor: "white"
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    margin: 10
  }
});