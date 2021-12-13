import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Stack,
  HStack,
  Box,
  Button,
  VStack,
  TextField,
  Text,
  Center,
  Divider,
  Heading,
} from "native-base";
import axios from "axios";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { baseUrl } = require('../assets/baseUrl')

export default function BriefingForm({ navigation, route }) {
  const userData = route.params.userData;
  const [OfficerToken, setOfficerToken] = useState('')

  useEffect(async ()=>{
    const token = await AsyncStorage.getItem('access_token')
    setOfficerToken(token)
   },[])

  const successAlert = () => {
    Alert.alert(
      "Berhasil",
      "Pergantian status telah dilakukan dengan berhasil",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  const changeStatus = async () => {
    try {
      const response = await axios(
        `${baseUrl}/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token: OfficerToken
          },
        }
      );
      console.log("changeStatus berhasil");
      console.log(response.data, "from changeStatus");
    } catch (error) {
      console.log('changeStatus gagal');
      throw error;
    }
  };

  const putQuarantine = async (roomNumber) => {
    try {
      const response = await axios(
        `${baseUrl}/quarantines/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token: OfficerToken
          },
          data: {
            roomNumber: roomNumber,
          },
        }
      );
      console.log("Quarantine berhasil");
      console.log(response.data, "dari putQuarantine");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitForm = async (roomNumber) => {
    console.log(roomNumber);
    if(!roomNumber){
      //throw error
      Alert.alert("Please fill all the fields");
    }
    try {
    await putQuarantine(roomNumber)
    await changeStatus()
    successAlert()
    navigation.navigate("HomeScreen")
    } catch (error) {
      console.log(error);
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const formik = useFormik({
    initialValues: {
      roomNumber: "",
    },
    onSubmit: (values) => {
      console.log("kepencet");
      console.log(JSON.stringify(values, null, 2));
      console.log(values.roomNumber);
      handleSubmitForm(values.roomNumber);
    },
  });

  return (
    <Box
      safeArea
      flex={1}
      bg={{
        linearGradient: {
          colors: ["#0e3599", "#02023A"],
          start: [0, 0],
        },
      }}
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
    >
      <Heading
      color={"white"}
      m="5"
      >Briefing Form</Heading>
      <Box m={5} bg="white" rounded="2xl">
        <Box my={5} mx={5}>
          <Heading>Profil Pengunjung</Heading>
          <Divider my="2" />
          <HStack mt={5}>
            <Text fontSize="md" w="1/3" bold>
              Nama:
            </Text>
            <Text fontSize="md" ml="2">
              {userData?.name}
            </Text>
          </HStack>
          <HStack mt={6}>
            <Text fontSize="md" w="1/3" bold>
              Passport:
            </Text>
            <Text fontSize="md" ml="2">
              {userData?.passportNumber}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="md">
            <Text fontSize="md" w="1/3" bold>
              Status:{" "}
            </Text>
            <Text fontSize="md" ml="2">
              {userData?.status}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="md">
            <Text fontSize="md" w="1/3" bold>
              Email:{" "}
            </Text>
            <Text fontSize="md" ml="2">
              {userData?.email}
            </Text>
          </HStack>
          <HStack mt={6} fontSize="md">
            <Text fontSize="md" w="1/3" bold>
              Telepon:{" "}
            </Text>
            <Text fontSize="md" ml="2">
              {userData?.phoneNumber}
            </Text>
          </HStack>
        </Box>
      </Box>
      <Center>
        {/* taro form disini */}
        <Box mx={5} w="90%" bg="white" rounded="2xl">
          <VStack my="5" mx="5">
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Nomor Kamar</FormControl.Label>
                <Input
                  mx="3"
                  placeholder="Masukkan Nomor Kamar"
                  onChangeText={formik.handleChange("roomNumber")}
                  value={formik.values.roomNumber}
                />
              </Stack>
            </FormControl>
          </VStack>
        </Box>

        <Button
          w="2/4"
          p={5}
          mt={5}
          borderRadius={"md"}
          bg="#0E3599"
          shadow={5}
          onPress={formik.handleSubmit}
        >
          Lanjut
        </Button>
      </Center>
    </Box>
  );
}
