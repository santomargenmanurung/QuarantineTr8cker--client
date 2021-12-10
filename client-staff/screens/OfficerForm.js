import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
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
// const api = create({
//   baseURL: 'http://192.168.5.11',
//   headers: { access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MDU4MjY3fQ.2TbWPbxGE0UfjdXY4AeYkFhpIBaxU5Hp-6KRZe9tGFQ"},
// })

export default function OfficerForm({ navigation, route }) {
  const [officerData, setOfficerData] = useState({})
  const userData = route.params.userData

  const successAlert = () => {
    Alert.alert(
      "Berhasil",
      "Pergantian status telah dilakukan dengan berhasil",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }


  
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
    console.log('pressed')
    let statusData;
    switch (userData.status) {
      case "ArrivalProcedure":
        statusData = "Interview"
        break;
      case "Interviewed":
        statusData = "Exit Terminal"
        break;
      case "Exit Terminal":
        statusData = "On Route"
        break;
      case "Quarantine":
        statusData = "SwabPertama"
        break;
      case "SwabPertama":
        statusData = "SwabKedua"
        break;
      default:
        break;
    }
    try {
      console.log(userData.id)
      //await AsyncStorage()
      const response = await axios(`http://192.168.5.11:3000/users/${userData.id}`,{
        method: "PUT",
        headers:{
          access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MDU4MjY3fQ.2TbWPbxGE0UfjdXY4AeYkFhpIBaxU5Hp-6KRZe9tGFQ'
        },
        data: {
          status: statusData
        }
      })
      console.log(response.data)
      successAlert()
      navigation.navigate('HomeScreen')
    } catch (error) {
      Alert.alert(
        "Error",
        `${error.response.data.message}`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      console.log(error.response.data)
    }
  };

    return (
      <Center flex={1} bg="#193498">
        <VStack space={4} alignItems="center">
          <Box
          bg="white"
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
