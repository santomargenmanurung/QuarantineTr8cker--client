import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  VStack,
  Center,
  Heading,
  Box,
  Icon,
  Pressable,
  Circle,
  Text,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// {
//     "id": "integer",
//     "name": "string",
//     "passportNumber": "string",
//     "role": |> One of the list of Roles <|,
//     "email": "string",
//     "phoneNumber": "string",
//     "status": |> One of the list of Status <|
//   }

export default function OfficerForm({ navigation, route }) {
  const [officerData, setOfficerData] = useState({})
  const userData = route.params.userData
  
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
  
  // const userData = {
  //   id: "1",
  //   name: "Denis",
  //   passportNumber: "1a2b3c",
  //   role: "User",
  //   email: "",
  //   phoneNumber: "",
  //   status: "ArrivalProcedure",
  // };

  const handleArrivalProcedure = async () => {
    let statusData;
    switch (userData.status) {
      case "ArrivalProcedure":
        statusData = "Interview"
        break;
      case "Interviewed":
        statusData = "Exit Terminal"
      case "Exit Terminal":
        statusData = "On Route"
        break;
      case "Quarantine":
        statusData = "SwabPertama"
      case "SwabPertama":
        statusData = "SwabKedua"
      default:
        break;
    }
      // axios({
      //   method: 'put',
      //   url: `http://localhost:3000/users/${userData.id}`,
      //   data: {
      //     status: statusData,
      //   }
      // })
      // .then((data) => {
      //   console.log(data)
      //   navigation.navigate('HomeScreen')
      // })
      // .catch((err) => {
      //   console.log(err)
      // })

      console.log(statusData)
      navigation.navigate('HomeScreen')
  };

    return (
      <Center flex={1} bg="blue.100">
        <VStack space={4} alignItems="center">
          <Box
          bg="blue.400"
          p="5"
          py="10"
          rounded="lg"
          color="white"
          >
            <Text fontSize="xl">Nama: {userData.name}</Text>
            <Text fontSize="xl">Passport ID: {userData.passportNumber}</Text>
            <Text fontSize="xl">Status: {userData.status}</Text>
          </Box>

          <Pressable onPress={() => handleArrivalProcedure()}>
            <Center maxW="80" rounded="lg" bg="blue.500" p="5">
              <Text fontSize="xl" textAlign="center" color="white">
                Proceed Next Step
              </Text>
            </Center>
          </Pressable>
        </VStack>
      </Center>
    );
}
