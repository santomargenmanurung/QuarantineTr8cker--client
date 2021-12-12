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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BriefingForm({ navigation, route }) {
  const userData = route.params.userData;
  // const userData = {
  //   id: 8,
  //   name: "John Doe",
  //   passportNumber: "B0123456",
  //   role: "User",
  //   email: "john@doe.com",
  //   phoneNumber: "08123456789",
  //   status: "Interviewed",
  // };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJvZmZpY2VyQHdpc21hLmNvbSIsInJvbGUiOiJPZmZpY2VyV2lzbWEiLCJpYXQiOjE2MzkyNzgyNzR9.4hG_gYybT__pYqom9SpL6elcD-i2Funvq1l-F_er8EI",
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

  const putQuarantine = async (roomNumber, date) => {
    try {
      const response = await axios(
        `http://192.168.5.11:3000/quarantines/${userData.id}`,
        {
          method: "PUT",
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJvZmZpY2VyQHdpc21hLmNvbSIsInJvbGUiOiJPZmZpY2VyV2lzbWEiLCJpYXQiOjE2MzkyNzgyNzR9.4hG_gYybT__pYqom9SpL6elcD-i2Funvq1l-F_er8EI",
          },
          data: {
            roomNumber: roomNumber,
            quarantineUntil: date,
          },
        }
      );
      console.log("Quarantine berhasil");
      console.log(response.data, "dari putQuarantine");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitForm = async (roomNumber, date) => {
    console.log(roomNumber, date);
    if(!roomNumber || date === new Date()){
      //throw error
      Alert.alert("Please fill all the fields");
    }
    try {
    await putQuarantine(roomNumber, date)
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
      quarantineUntil: "",
    },
    onSubmit: (values) => {
      console.log("kepencet");
      console.log(JSON.stringify(values, null, 2));
      console.log(values.roomNumber);
      handleSubmitForm(values.roomNumber, date);
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
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Nomor Kamar</FormControl.Label>
                <Input
                  mx="3"
                  placeholder="Masukkan Nomor Kamar"
                  onChangeText={formik.handleChange("roomNumber")}
                  value={formik.values.roomNumber}
                />
                <FormControl.Label>Tanggal Selesai</FormControl.Label>
                <Input
                  type={"text"}
                  mx="3"
                  InputRightElement={
                    <Button
                      size="xs"
                      rounded="none"
                      w="2/5"
                      h="full"
                      onPress={showDatepicker}
                    >
                      Pilih tanggal
                    </Button>
                  }
                  // date to localstring indonesia
                  placeholder={date.toLocaleDateString('en-GB')}
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
              </Stack>
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
