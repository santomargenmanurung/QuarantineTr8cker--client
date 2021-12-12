import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Stack,
  HStack,
  Box,
  Button,
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

// GET /locations
// FORM
// PUT /quarantines/:userId
// req.body{locationId: id}
// PUT /users/:id
// status -> interviewed

export default function InterviewForm({ navigation, route }) {
  const [locations, setLocations] = useState([]);
  const userData = route.params.userData;

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const response = await axios(`http://192.168.5.11:3000/locations`, {
        method: "GET",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTQwNTA5fQ.3cxJG7o9nSM5ffAnM2RdLHJWTJc9I1PQY1GkAqQMd-I",
        },
      });
      //jangan lupa diganti jadi response.data.pageData
      setLocations(response.data.pageData);
    } catch (error) {
      console.log(error, "error getLocation");
    }
  };

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
        `http://192.168.5.11:3000/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTQwNTA5fQ.3cxJG7o9nSM5ffAnM2RdLHJWTJc9I1PQY1GkAqQMd-I",
          },
          data: {
            status: "Interviewed",
          },
        }
      );
      console.log("changeStatus berhasil");
      console.log(response.data, "from changeStatus");
    } catch (error) {
      throw error;
    }
  };

  const putLocation = async (locationId) => {
    try {
      const response = await axios(
        `http://192.168.5.11:3000/quarantines/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTQwNTA5fQ.3cxJG7o9nSM5ffAnM2RdLHJWTJc9I1PQY1GkAqQMd-I",
          },
          data: {
            locationId: locationId,
          },
        }
      );
      console.log("putLocation berhasil");
      console.log(response.data, "dari putLocation");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitForm = async (locationId) => {
    try {
      const locationResponse = await putLocation(locationId);
      const statusResponse = await changeStatus();
      successAlert();
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error, "error di handleSubmitForm");
      Alert.alert("Error", `${error.response.data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const formik = useFormik({
    initialValues: {
      locations: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      console.log(values.locations);
      handleSubmitForm(values.locations);
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
        <View
          style={{
            width: "90%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            overflow: "hidden",
          }}
        >
          <Picker
            enabled={true}
            mode="dropdown"
            placeholder="Select City"
            onValueChange={formik.handleChange("locations")}
            selectedValue={formik.values.locations}
            style={{
              color: "black",
              placeholderTextColor: "black",
              backgroundColor: "white",
              margin: 5,
              borderRadius: 10,
            }}
          >
            {locations.map((item) => {
              return (
                <Picker.Item
                  label={item.name.toString()}
                  value={item.id.toString()}
                  key={item.id}
                />
              );
            })}
          </Picker>
        </View>
        <Button w="2/4" p={5} mt={5} borderRadius={"md"} bg="#ABA5DB" shadow={5} onPress={formik.handleSubmit}>
          Lanjut
        </Button>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    backgroundColor: "white",
  },
});
