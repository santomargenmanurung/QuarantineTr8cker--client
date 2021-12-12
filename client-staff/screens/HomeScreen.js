import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "../store/actions";
import { View, Text, Button, StyleSheet } from "react-native";
import { VStack, Center, Heading, Box, Icon, Pressable, Circle } from "native-base"
import LottieView from 'lottie-react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons"


export default function HomeScreen({ navigation }) {
  let dispatch = useDispatch()
  let state = useSelector(state => state)

  useEffect(() => {
    dispatch(setToken("IniTokenTesting"))
  }, [])
  
  return (
    <VStack space={4} alignItems="center">
      <Heading textAlign="center" mb="10" pt="10">
        Hi, Denis Irawan
        {state.access_token}
      </Heading>
      <Box w="80%" h="50%" p="10" backgroundColor="white" rounded="md" shadow={1}>
        <LottieView source={require('../assets/lottie-qr-scan.json')} autoPlay loop />
      </Box>
      <Center
        flex={1}
        background="blue.100"
        px={5}
        rounded="2xl"
      >
        Tekan tombol biru dibawah untuk scan
      </Center>

      <Pressable
        _pressed={{ transform: [{ scale: 0.9 }] }}
        onPress={() => navigation.navigate("QRScanner", { screen: "QRScanner" })}
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