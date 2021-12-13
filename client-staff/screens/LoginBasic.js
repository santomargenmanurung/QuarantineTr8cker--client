import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  NativeBaseProvider,
} from "native-base";
import { useFormik } from "formik";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
const { baseUrl } = require("../assets/baseUrl");
import { setToken } from "../store/actions";
import { Alert } from "react-native";
import Svg, { SvgXml, SvgUri } from "react-native-svg";
import { logo, backgroundSvg, logoBase64 } from "../assets/loginAssets";
const imgLogo = require('../assets/crop.png');

export default function LoginBasic({ navigation }) {
  const dispatch = useDispatch();
  let state = useSelector((state) => state);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios(`http://192.168.5.11:3000/login`, {
        method: "POST",
        data: {
          email,
          password,
        },
      });
      console.log(response.data);
      await AsyncStorage.setItem("access_token", response.data.access_token);
      await AsyncStorage.setItem("name", response.data.name);
      await AsyncStorage.setItem("role", response.data.role);
      const value = await AsyncStorage.getItem("access_token");
      dispatch(setToken(response.data.access_token));
      if (value) navigation.navigate("HomeScreen");
      //   dispatch(login(true))
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert(`Error`,`${error.response.data.message}`);
      
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("kepencet");
      console.log(JSON.stringify(values, null, 2));
      console.log(values.email, values.password);
      handleLogin(values.email, values.password);
    },
  });

  return (
    <Box
      safeArea
      w="100%"
      flex={1}
      bg={{
        linearGradient: {
          colors: ["#0e3599", "#02023A"],
          start: [0, 0],
        },
      }}
    >
      <Box
      my={5}
      >
        {/* <SvgXml width="100%" height="100%" xml={logo}></SvgXml> */}
        <Image source={imgLogo}
        alt="logo crop"
        height="100"
        resizeMode={"contain"}
         />;
      </Box>
      <Box
      bg={"white"}
      p="10"
      m="5"
      rounded="xl"
      >
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input
            mx="3"
            placeholder="email"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            mx="3"
            placeholder="password"
            onChangeText={formik.handleChange("password")}
            value={formik.values.password}
          />
          <Link
            _text={{
              fontSize: "sm",
              fontWeight: "500",
              color: "#1597E5",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="blue" onPress={formik.handleSubmit}>
          Sign in
        </Button>
      </VStack>
      </Box>

    </Box>
  );
}
