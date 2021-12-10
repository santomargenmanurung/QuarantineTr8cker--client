import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Button,
  TextField,
  Center,
  NativeBaseProvider,
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
  const [locations, setLocations] = useState([])
  const userData = route.params.userData

  useEffect(()=>{
    getLocations()
  },[])

  const getLocations = async () => {
    try {
      const response = await axios(`http://192.168.5.11:3000/locations`,{
        method: "GET",
        headers:{
          access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MDU4MjY3fQ.2TbWPbxGE0UfjdXY4AeYkFhpIBaxU5Hp-6KRZe9tGFQ'
        }
      }) 
      console.log(response.data)
      setLocations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const successAlert = () => {
    Alert.alert(
      "Berhasil",
      "Pergantian status telah dilakukan dengan berhasil",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const changeStatus = async () => {
    try {
      const response = await axios(`http://192.168.5.11:3000/users/${userData.id}`,{
        method: "PUT",
        headers:{
          access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTI4MTg1fQ.HPWXOWCglRy4cd6eGsakazGQkAGDVrGxChVQyud-Szc'
        },
        data: {
          status: "Interviewed"
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
  }

  const putLocation = async (locationId) =>{
    try {
      const response = await axios(`http://192.168.5.11:3000/quarantines/${userData.id}`,{
        method: "PUT",
        headers:{
          access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvZmZpY2VyQGFpcnBvcnQuY29tIiwicm9sZSI6Ik9mZmljZXJBaXJwb3J0IiwiaWF0IjoxNjM5MTI4MTg1fQ.HPWXOWCglRy4cd6eGsakazGQkAGDVrGxChVQyud-Szc'
        },
        data: {
          locationId: locationId
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
  }
 
  const handleSubmitForm = async (locationId) => {
    try {
      await putLocation(locationId)
      await changeStatus()
      navigation.navigate('HomeScreen')
    } catch (error) {
      console.log(error)
    }

  }


  const formik = useFormik({
    initialValues: {
      locations: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
      handleSubmitForm(values.locations)
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
    flex={1}
    bg="blue.500"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          color: "warmGray.50",
          letterSpacing: "lg",
        }}   
    >
      <Center
      m={4}
      h="2/4"
      bg="white"
      rounded="2xl"
      >
        {JSON.stringify(userData)}
      </Center>
      <Picker
        enabled={true}
        mode="dropdown"
        placeholder="Select City"
        onValueChange={formik.handleChange("locations")}
        selectedValue={formik.values.locations}
      >
        {locations.map((item) => {
          return (
            <Picker.Item label={item.name.toString()} value={item.id.toString()} key={item.id} />
          );
        })}
      </Picker>
      <Button
        w="2/4"
       onPress={formik.handleSubmit}>Submit</Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    backgroundColor: "white"
  },
});
