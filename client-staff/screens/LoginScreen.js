import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
const { baseUrl } = require("../assets/baseUrl");
const axios = require("axios");
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TextInput,
} from "react-native";
// import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import { SvgXml } from "react-native-svg";
// import { useFonts } from "expo-font";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  backgroundSvg,
  logo,
  loginButton,
  loginForm,
  sideItem,
} from "../assets/loginAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  //   if (!fontsLoaded) null;

  useEffect(() => {
    console.log("INI ADALAH LINK");
  }, []);

  const loginButtonPress = async (e) => {
    // await AsyncStorage.setItem('key', value)
    try {
      // console.log(email, password, "MASUK");
      let resp = await axios(`${baseUrl}/login`, {
        method: "POST",
        data: {
          email: email.toLowerCase(),
          password: password,
        },
      });
      //   console.log(resp.data.access_token, "INI HASIL");
      await AsyncStorage.setItem("access_token", resp.data.access_token);
      const value = await AsyncStorage.getItem("access_token");
      setErrorLogin(false);
      if (value) navigation.navigate("HomeScreen");

      // console.log(value, "RS_");
    } catch (error) {
      console.log(error.message, "INI ERRORNYA");
      if (error.message == "Request failed with status code 400")
        setErrorLogin(true);
    }
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
          zIndex: 0,
          left: -170,
          top: -600,
        }}
        width="150%"
        height="150%"
        xml={sideItem}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 0,
          left: 0,
          top: -445,
        }}
        width="100%"
        height="100%"
        xml={logo}
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
              left: 60,
              top: 476,
              width: 250,
            }}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Please input your email"
            keyboardType="email-address"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 60,
              top: 535,
              width: 250,
            }}
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Please input your password"
            keyboardType="default"
          />
        </View>
      </TouchableWithoutFeedback>
      <SvgXml
        onPress={() => loginButtonPress()}
        style={{
          position: "absolute",
          borderColor: "black",
          zIndex: 2,
          left: 100,
          top: 420,
        }}
        width="50%"
        height="50%"
        xml={loginButton}
      ></SvgXml>
      {errorLogin ? (
        <Text
          style={{
            fontFamily: "Helvetica",
            position: "absolute",
            color: "white",
            fontWeight: "bold",
            zIndex: 50,
            left: 80,
            top: 580,
            fontSize: 10,
          }}
        >
          PLEASE CHECK YOUR LOGIN OR PASSWORD
        </Text>
      ) : (
        <></>
      )}
      <Text
        style={{
          position: "absolute",
          zIndex: 2,
          left: 70,
          top: 160,
          color: "#02023A",
          textAlign: "center",
          fontFamily: "Helvetica-Bold",
          fontSize: 15,
        }}
      >
        Indonesian Quarantine Official App
      </Text>
    </>
  );
}
