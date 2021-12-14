import { StatusBar } from "expo-status-bar";
const { baseUrl } = require("../../assets/baseUrl");
const axios = require("axios");
import React, { useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { SvgXml } from "react-native-svg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  backgroundSvg,
  loginButton,
  loginForm,
  registerButton,
  sideItem,
} from "../../assets/loginAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../store/actionCreator/itemAction";

export default function Login({ navigation }) {
  // const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const dispatch = useDispatch();
  const offset = useSharedValue(2);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      offset.value = -0.18;
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      offset.value = 4;
    });
    return unsubscribe;
  }, [navigation]);

  const rightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value * 50) },
        { translateY: withSpring(1 * 255) },
      ],
    };
  });

  const loginButtonPress = async (e) => {
    try {
      // console.log(email, password, "MASUK");
      let resp = await axios(`${baseUrl}/login`, {
        method: "POST",
        data: {
          email: email.toLowerCase(),
          password: password,
        },
      });
      // console.log(resp, "INI HASIL");
      await AsyncStorage.setItem("access_token", resp.data.access_token);
      const value = await AsyncStorage.getItem("access_token");
      setErrorLogin(false);
      onChangeEmail("");
      onChangePassword("");
      if (value) {
        console.log("MASUK KE LOGIN");
        dispatch(setToken(value)); //*************** */
        navigation.navigate("MyTrips");
      }

      // console.log(value, "RS_");
    } catch (error) {
      console.log(error.message, "INI ERRORNYA");
      if (error.message == "Request failed with status code 400")
        setErrorLogin(true);
      // console.log("SALAAAHHH");
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
      <Animated.View
        style={[
          {
            flex: 1,
            // borderColor: "black",
            color: "#520F9A",
          },
          rightStyle,
        ]}
      >
        <SvgXml
          style={{
            position: "absolute",
            zIndex: 3,
            left: -180,
            top: -340,
          }}
          width="200%"
          height="200%"
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
              left: 60,
              top: 175,
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
              top: 235,
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
          // fontFamily: "Nunito_700Bold",
        }}
        width="50%"
        height="50%"
        xml={loginButton}
      ></SvgXml>
      <SvgXml
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={{
          position: "absolute",
          zIndex: 2,
          left: 100,
          top: 500,
        }}
        width="50%"
        height="50%"
        xml={registerButton}
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
  anim: { position: "absolute", zIndex: 0, left: -10, top: -220 },
});
