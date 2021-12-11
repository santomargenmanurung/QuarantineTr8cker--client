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
import { Picker } from "@react-native-picker/picker";

export default function BriefingForm({ navigation, route }) {
  // const userData = route.params.userData;
  const userData = {
    id: 8,
    name: "John Doe",
    passportNumber: "B0123456",
    role: "User",
    email: "john@doe.com",
    phoneNumber: "08123456789",
    status: "Interviewed",
  };

  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      quarantineUntil: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

      //   handleSubmitForm(values.locations);
    },
  });

  return (
    <Box
      flex={1}
      bg="#193498"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
    >
      <Box m={5} h="2/4" bg="white" rounded="2xl">
        <Box my={5} mx={5}>
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
      <Center>
        {/* taro form disini */}
        <Box mx={5} w="90%" bg="white" rounded="2xl">
          <VStack my="5" mx="5">
            <FormControl>
              <FormControl.Label
              >Room Number</FormControl.Label>
              <Input />
            </FormControl>
          </VStack>
        </Box>

        <Button
          w="2/4"
          p={5}
          mt={5}
          borderRadius={"md"}
          bg="#ABA5DB"
          shadow={5}
          onPress={formik.handleSubmit}
        >
          Lanjut
        </Button>
      </Center>
    </Box>
  );
}
