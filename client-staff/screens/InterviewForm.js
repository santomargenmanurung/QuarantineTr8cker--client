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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useFormik } from "formik";
import { Picker } from "@react-native-picker/picker";
const { baseUrl } = require("../assets/baseUrl");
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

// GET /locations
// FORM
// PUT /quarantines/:userId
// req.body{locationId: id}
// PUT /users/:id
// status -> interviewed

export default function InterviewForm({ navigation, route }) {
  const userData = route.params.userData;
  const [locations, setLocations] = useState([]);
  const [officerToken, setOfficerToken] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state);

  useEffect(async () => {
    setLocations([]);
    const token = await AsyncStorage.getItem("access_token");
    console.log(token);
    setOfficerToken(token);
    if (token) {
      getLocations(token);
    }
    // console.log(access_token)
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(date);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const getLocations = async (token) => {
    try {
      console.log(officerToken, "officerToken");
      const response = await axios(`${baseUrl}/locations`, {
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      setLocations(response.data.pageData);
    } catch (error) {
      console.log(baseUrl);
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
      const response = await axios(`${baseUrl}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          access_token: officerToken,
        },
        data: {
          status: "Interviewed",
        },
      });
      console.log("changeStatus berhasil");
      console.log(response.data, "from changeStatus");
    } catch (error) {
      throw error;
    }
  };

  const putLocation = async (locationId, date) => {
    try {
      const response = await axios(`${baseUrl}/quarantines/${userData.id}`, {
        method: "PUT",
        headers: {
          access_token: officerToken,
        },
        data: {
          locationId: locationId,
          quarantineUntil: date,
        },
      });
      console.log("putLocation berhasil");
      console.log(response.data, "dari putLocation");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitForm = async (locationId, date) => {
    try {
      const locationResponse = await putLocation(locationId, date);
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
      quarantineUntil: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      console.log(values.locations, values.quarantineUntil);
      setDisabled(true)
      handleSubmitForm(values.locations, date);
    },
  });

  return (
    <Box
      safeArea
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
      <Center bg={"white"} p={5} m={5} rounded="lg">
        <FormControl.Label>Lokasi</FormControl.Label>
        <View
          style={{
            width: "100%",
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "black",
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
        <Center
          mt={5}
        >
          <FormControl.Label>Tanggal Selesai</FormControl.Label>
          <Input
            type={"text"}
            width={"full"}
            mx={5}
            InputRightElement={
              <Button
                size="xs"
                bg="#2A2052"
                rounded="none"
                w="2/5"
                h="full"
                onPress={showDatepicker}
              >
                Pilih tanggal
              </Button>
            }
            // date to localstring indonesia
            placeholder={date.toLocaleDateString("en-GB")}
          />
          <Box>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </Box>
        </Center>
        <Button
          isDisabled={disabled}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    backgroundColor: "white",
  },
});
