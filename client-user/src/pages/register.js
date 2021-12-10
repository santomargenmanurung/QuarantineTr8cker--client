import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import {
  SearchBar,
  Card,
  ListItem,
  Button,
  Input,
} from "react-native-elements";
// const axios = require('axios').default;
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  TextInput,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";
const axios = require("axios");
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  backgroundSvg,
  loginButton,
  loginForm,
  registerButtonStyle,
  sideItem,
} from "../../assets/register";

export default function Detail() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passport, onChangePassport] = useState("");
  const [phone, onChangePhone] = useState("");
  const [fullName, onChangeFullName] = useState("");

  useEffect(() => {
    // console.log("INI ADALAH LINK");
  }, []);

  const registerButton = (e) => {
    console.log("email", email);
    console.log("password", password);
    console.log("ASSSSSS");
    axios({
      method: "POST",
      url: "http://192.168.100.77:3000/register/",
      data: {
        name: fullName,
        passportNumber: passport,
        email: email.toLowerCase(),
        password: password,
        phoneNumber: phone,
      },
    })
      .then((data) => {
        if (data.status == 201) navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <SvgXml
        style={{
          position: "absolute",
          left: -1,
          top: -2,
        }}
        width="100%"
        height="100%"
        xml={backgroundSvg}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 5,
          left: -250,
          top: -720,
        }}
        width="200%"
        height="200%"
        xml={sideItem}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 0,
          left: 50,
          top: 200,
        }}
        width="70%"
        height="70%"
        xml={loginForm}
      ></SvgXml>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 380,
              width: 250,
            }}
            onChangeText={onChangeFullName}
            value={fullName}
            keyboardType="default"
            placeholder="Full Name"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 440,
              width: 250,
            }}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 500,
              width: 250,
            }}
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            keyboardType="defalut"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 565,
              width: 250,
            }}
            // secureTextEntry={true}
            onChangeText={onChangePassport}
            value={passport}
            placeholder="Passport Number"
            keyboardType="defalut"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 630,
              width: 250,
            }}
            onChangeText={onChangePhone}
            value={phone}
            keyboardType="numeric"
            placeholder="Phone Number"
          />
        </View>
      </TouchableWithoutFeedback>
      <SvgXml
        onPress={() => registerButton()}
        style={{
          position: "absolute",
          zIndex: 2,
          left: 100,
          top: 520,
        }}
        width="50%"
        height="50%"
        xml={registerButtonStyle}
      ></SvgXml>
      <Text
        style={{
          top: 780,
          left: 150,
          color: "white",
          position: "absolute",
          zIndex: 888,
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        {" "}
        Back to login
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6EEFD",
    padding: 10,
    paddingTop: 60,
  },
  buttonYoutube: {
    backgroundColor: "#F6EEFD",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "AvenirNextCondensed-BoldItalic",
    width: 150,
  },
  viewbuttonYoutube: {
    width: 150,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalLoading: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginTop: 100,
  },
});
