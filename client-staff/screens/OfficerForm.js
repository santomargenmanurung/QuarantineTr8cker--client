import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import {
  VStack,
  Center,
  Heading,
  Box,
  Icon,
  Divider,
  Pressable,
  Circle,
  HStack,
  Text,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { baseUrl } = require("../assets/baseUrl");


export default function OfficerForm({ navigation, route }) {
  const [officerToken, setOfficerToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(async () => {
    const token = await AsyncStorage.getItem("access_token");
    setOfficerToken(token);
  }, []);

  const userData = route.params.userData;

  const successAlert = () => {
    Alert.alert(
      "Berhasil",
      "Pergantian status telah dilakukan dengan berhasil",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  // const checkOfficer = async () => {
  //   try {
  //     let findOfficer = await AsyncStorage.getItem('officer');
  //     setOfficerData(JSON.parse(findOfficer))
  //     // setIsLoad(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   checkOfficer()
  // },[]);

  const handleArrivalProcedure = async () => {
    setIsLoading(true);
    let statusData;
    switch (userData.status) {
      case "ArrivalProcedure":
        statusData = "Interview";
        break;
      case "Interviewed":
        statusData = "Exit Terminal";
        break;
      case "Exit Terminal":
        statusData = "On Route";
        break;
      case "Quarantine":
        statusData = "SwabPertama";
        break;
      case "SwabPertama":
        statusData = "SwabKedua";
        break;
      default:
        break;
    }
    try {
      console.log(userData.id);
      //await AsyncStorage()
      const response = await axios(`${baseUrl}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          access_token: officerToken,
        },
      });
      console.log(response.data);
      setIsLoading(false);
      successAlert();
      navigation.navigate("HomeScreen");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log(error.response.data);
    }
  };
  
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Circle size={50} />
      </View>
    )
  }
  return (
    <Box 
    safeArea 
    flex={1} 
    bg={{
      linearGradient: {
        colors: ["#0e3599", "#02023A"],
        start: [0, 0],
      },
    }}>
      <Heading
      m={5}
      color={"white"}
      >Officer Form</Heading>
      <Box m={5} w="90%" bg="white" rounded="2xl">
        <Box my={5} mx={2} ml={5}>
          <Heading>Profil Pengunjung</Heading>
          <Divider my="2" />
          <HStack>
            <Text fontSize="xl" w="1/3" bold>
              Nama:
            </Text>
            <Text fontSize="xl" ml="2">
              {userData?.name}
            </Text>
          </HStack>
          <HStack mt={6}>
            <Text fontSize="xl" w="1/3" bold>
              Passport:
            </Text>
            <Text fontSize="xl" ml="2">
              {userData?.passportNumber}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="xl">
            <Text fontSize="xl" w="1/3" bold>
              Status:{" "}
            </Text>
            <Text fontSize="xl" ml="2">
              {userData?.status}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="xl">
            <Text fontSize="xl" w="1/3" bold>
              Email:{" "}
            </Text>
            <Text fontSize="xl" ml="2">
              {userData?.email}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="xl">
            <Text fontSize="xl" w="1/3" bold>
              Telepon:{" "}
            </Text>
            <Text fontSize="xl" ml="2">
              {userData?.phoneNumber}
            </Text>
          </HStack>
        </Box>
      </Box>
      <VStack space={4} alignItems="center">
        <Pressable
         _pressed={{ transform: [{ scale: 0.9 }] }}
        onPress={() => handleArrivalProcedure()}>
          <Center maxW="80" rounded="lg" bg="#5A1C94" p="5" pt="5" shadow={3}>
            <Text fontSize="xl" textAlign="center" color="white">
              Proceed Next Step
            </Text>
          </Center>
        </Pressable>
      </VStack>
    </Box>
  );
}
