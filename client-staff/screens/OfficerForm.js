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
  const [officerData, setOfficerData] = useState({});
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
    console.log("pressed");
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
      const response = await axios(
        `http://192.168.5.11:3000/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTkzNjQ1fQ.EF7kobteWlY2VmYmfVwxucgT6HZM5EgNJwgdrg2_Eqc",
          },
          data: {
            status: statusData,
          },
        }
      );
      console.log(response.data);
      successAlert();
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log(error.response.data);
    }
  };

  return (
    <Center flex={1} bg="#193498">
      <Box m={5} w="90%" h="2/4" bg="white" rounded="2xl">
        <Box my={5} mx={2} ml={5}>
          <Heading>Profil Pengunjung</Heading>
          <Divider my="2" />
          <HStack mt={6}>
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
        <Pressable onPress={() => handleArrivalProcedure()}>
          <Center maxW="80" rounded="lg" bg="#ABA5DB" p="5">
            <Text fontSize="xl" textAlign="center" color="white">
              Proceed Next Step
            </Text>
          </Center>
        </Pressable>
      </VStack>
    </Center>
  );
}