import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  VStack,
  Button,
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
import LottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { baseUrl } = require("../assets/baseUrl");

export default function OfficerForm({ navigation, route }) {
  const [officerToken, setOfficerToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem("access_token");
    setOfficerToken(token);
  }, []);

  useEffect(() => {
    setDisabled(false);
    if (
      userData.status === "Quarantine" ||
      userData.status === "1st Swab" ||
      userData.status === "2nd Swab"
    ) {
      setShowEmergency(true);
    }
  }, []);

  const userData = route.params.userData;

  const successAlert = () => {
    Alert.alert(
      "Berhasil",
      "Pergantian status telah dilakukan dengan berhasil",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };
  const emergencyAlert = () => {
    Alert.alert("Berhasil", "Ambulans telah dikirim menuju lokasi", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const handleEmergency = async () => {
    setDisabled(true);
    setIsLoading(true);
    try {
      console.log("masuk emergencry", userData.id);
      const response = await axios(`${baseUrl}/mail/${userData.id}`, {
        method: "GET",
        headers: {
          access_token: officerToken,
        },
      });
      console.log(response.data);
      setIsLoading(false);
      emergencyAlert();
      navigation.navigate("HomeScreen");
    } catch (error) {
      setDisabled(false);
      setIsLoading(false);
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log(error.response.data);
    }
  };

  const handleArrivalProcedure = async () => {
    setDisabled(true);
    setIsLoading(true);
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
      setDisabled(false);
      setIsLoading(false);
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log(error.response.data);
    }
  };

  if (isLoading) {
    return (
      <Center
        flex={1}
        bg={{
          linearGradient: {
            colors: ["#0e3599", "#02023A"],
            start: [0, 0],
          },
        }}
      >
        <LottieView
          source={require("../assets/loading_heartbeat.json")}
          autoPlay
          loop
        />
      </Center>
    );
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
      }}
    >
      <Heading m={5} color={"white"}>
        Officer Form
      </Heading>
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
          disabled={disabled}
          _pressed={{ transform: [{ scale: 0.9 }] }}
          onPress={() => handleArrivalProcedure()}
        >
          <Center maxW="80" rounded="lg" bg="#5A1C94" p="5" pt="5" shadow={3}>
            <Text fontSize="xl" textAlign="center" color="white">
              Proceed Next Step
            </Text>
          </Center>
        </Pressable>
        {showEmergency ? (
          <Pressable
            disabled={disabled}
            _pressed={{ transform: [{ scale: 0.9 }] }}
            onPress={() => handleEmergency()}
          >
            <Center maxW="80" rounded="lg" bg="red.500" p="5" pt="5" shadow={3}>
              <Text fontSize="xl" textAlign="center" color="white">
                Emergency Call
              </Text>
            </Center>
          </Pressable>
        ) : null}
      </VStack>
    </Box>
  );
}
