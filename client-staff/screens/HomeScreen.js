import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "../store/actions";
import { View, Button, StyleSheet} from "react-native";
import { VStack, Center, Heading, Box, Icon, Pressable, Circle, Text} from "native-base"
import LottieView from 'lottie-react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function HomeScreen({ navigation }) {
  let dispatch = useDispatch()
  let state = useSelector(state => state)
  const [officerName, setOfficerName] = useState('')
  const [officerRole, setOfficerRole] = useState('')

  useEffect(async ()=>{
   const name = await AsyncStorage.getItem('name')
   const role = await AsyncStorage.getItem('role')
   setOfficerName(name)
   setOfficerRole(role)
  },[])

  return (
    <VStack flex={1} space={4} alignItems="center" bg="#193498">
      <Box
      bg="blue.100"
      mt="10"
      px="10"
      py="5"
      w="80%"
      rounded={"md"}
      >
      <Text fontSize="xl" textAlign="left" color="black" shadow={5}>
        Nama    : {officerName}{'\n'}
        Jabatan : {officerRole}
      </Text>
      </Box>
      <Box w="80%" h="50%" p="10" backgroundColor="white" rounded="md" shadow={1}>
        <LottieView source={require('../assets/lottie-qr-scan.json')} autoPlay loop />
      </Box>
      <Center
      py={5}
      background="blue.100"
      px={10}
      rounded="2xl"
      >
        Tekan tombol dibawah untuk scan
      </Center>

      <Pressable
        _pressed={{ transform: [{ scale: 0.9 }] }}
        onPress={() => navigation.navigate("QRScanner", { screen: "QRScanner" })}
      >
        <Circle size={98} bg="#1597E5" shadow={3}>
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