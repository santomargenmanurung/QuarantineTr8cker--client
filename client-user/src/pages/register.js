import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
const { baseUrl } = require("../../assets/baseUrl");

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
  const offset = useSharedValue(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      offset.value = 1.8;
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      offset.value = -2;
    });
    return unsubscribe;
  }, [navigation]);

  const rightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(-1.8 * 50) },
        { translateY: withSpring(offset.value * 255) },
      ],
    };
  });

  const registerButton = (e) => {
    axios({
      method: "POST",
      url: `${baseUrl}/register/`,
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
        width="105%"
        height="105%"
        xml={backgroundSvg}
      ></SvgXml>
      <Animated.View
        style={[
          {
            flex: 1,
            color: "#520F9A",
          },
          rightStyle,
        ]}
      >
        <SvgXml
          style={{
            position: "absolute",
            zIndex: 5,
            left: -250,
            top: -720,
          }}
          width="250%"
          height="250%"
          xml={sideItem}
        ></SvgXml>
      </Animated.View>
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
        <View style={{ flex: 2 }}>
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 85,
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
              top: 140,
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
              top: 205,
              width: 250,
            }}
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            keyboardType="default"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 270,
              width: 250,
            }}
            // secureTextEntry={true}
            onChangeText={onChangePassport}
            value={passport}
            placeholder="Passport Number"
            keyboardType="default"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 330,
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
          offset.value = 0;
          setTimeout(() => {
            navigation.navigate("Login");
          }, 500);
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
