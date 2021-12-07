import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import {
  SearchBar,
  Card,
  ListItem,
  Button,
  Input,
} from "react-native-elements";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
// import { TextInput } from "react-native-paper";
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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  backgroundSvg,
  addQuarantine,
  loginForm,
  LeftTop,
  RightTop,
} from "../../assets/addQuarantine";

export default function AddQuarantine({ navigation }) {
  // const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const kananX = useSharedValue(-1);
  const kananY = useSharedValue(-19.5);

  const kiriX = useSharedValue(-3);
  const kiriY = useSharedValue(-47);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     kananX.value = 2;
  //     kananY.value = -21;
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("blur", () => {
  //     kananX.value = 1;
  //     kananY.value = -21;
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const rightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: withSpring(2 * 100) },
        // { translateY: withSpring(-11 * 100) },
        { translateX: withSpring(kananX.value * 50) },
        { translateY: withSpring(kananY.value * 50) },
      ],
    };
  });
  const leftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: withSpring(2 * 100) },
        // { translateY: withSpring(-11 * 100) },
        { translateX: withSpring(kiriX.value * 50) },
        { translateY: withSpring(kiriY.value * 50) },
      ],
    };
  });

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
          left: 50,
          top: 80,
        }}
        width="75%"
        height="75%"
        xml={loginForm}
      ></SvgXml>
      <Animated.View
        style={
          ({
            position: "absolute",
            zIndex: 998,
            left: -1,
            top: 100,
          },
          [rightStyle])
        }
      >
        <SvgXml width="150%" height="150%" xml={RightTop}></SvgXml>
      </Animated.View>

      <Animated.View
        style={
          ({
            position: "absolute",
            zIndex: 999,
            left: 1,
            top: -0.1,
          },
          [leftStyle])
        }
      >
        <SvgXml width="150%" height="150%" xml={LeftTop}></SvgXml>
      </Animated.View>

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
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Origin"
            keyboardType="email-address"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 440,
              width: 250,
            }}
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Arrival Port"
            keyboardType="defalut"
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
            // onChangeText={onChangePassword}
            // value={password}
            placeholder="Passport Number"
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
            // onChangeText={onChangePassword}
            // value={password}
            keyboardType="default"
            placeholder="Phone Number"
          />
          <TextInput
            style={{
              position: "absolute",
              zIndex: 9999,
              left: 70,
              top: 630,
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
        xml={addQuarantine}
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
          navigation.navigate("MyTrips");
        }}
      >
        {" "}
        Back to MyTrips
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
