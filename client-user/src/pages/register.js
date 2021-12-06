import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import {
  SearchBar,
  Card,
  ListItem,
  Button,
  Input,
} from "react-native-elements";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  backgroundSvg,
  loginButton,
  loginForm,
  registerButton,
  sideItem,
} from "../../assets/register";

export default function Detail() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    console.log("INI ADALAH LINK");
  }, []);

  const loginButtonPress = (e) => {
    console.log("email", email);
    console.log("password", password);
    fetch(`http://192.168.100.77:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then((response1) => {
        console.log(response1.access_token, "INII");
        // if (response1.access_token)
        navigation.navigate("Login");
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
          <Input
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 365,
            }}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Input
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 405,
              width: 250,
            }}
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            keyboardType="defalut"
          />
          <Input
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 445,
              width: 250,
            }}
            secureTextEntry={true}
            // onChangeText={onChangePassword}
            // value={password}
            placeholder="Passport Number"
            keyboardType="defalut"
          />
          <Input
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 485,
              width: 250,
            }}
            // onChangeText={onChangePassword}
            // value={password}
            keyboardType="numeric"
            placeholder="Phone Number"
          />
          <Input
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 520,
              width: 250,
            }}
            // onChangeText={onChangePassword}
            // value={password}
            keyboardType="default"
            placeholder="Address"
          />
        </View>
      </TouchableWithoutFeedback>
      <SvgXml
        onPress={() => loginButtonPress()}
        style={{
          position: "absolute",
          zIndex: 2,
          left: 100,
          top: 520,
        }}
        width="50%"
        height="50%"
        xml={registerButton}
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
