import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import { setToken } from "../store/actionCreator/itemAction";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
// import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  backgroundSvg,
  addQuarantine,
  loginForm,
  LeftTop,
  RightTop,
} from "../../assets/addQuarantine";
const axios = require("axios");
const { baseUrl } = require("../../assets/baseUrl");
import { Picker } from "@react-native-picker/picker";
import LottieView from "lottie-react-native";

export default function AddQuarantine({ navigation }) {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [origin, onChangeOrigin] = useState("");
  const [arrival, onChangeArrival] = useState("");
  const [newQuarantine, setNewQuarantine] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const kananX = useSharedValue(1);
  const kananY = useSharedValue(-19.5);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        // console.log(value);
        setLoading(true);
        let resp = await axios.get(`${baseUrl}/quarantines/`, {
          headers: {
            access_token: value,
          },
        });
        if (!resp.data[resp.data.length - 1].isQuarantined) {
          setNewQuarantine(true);
        }
        console.log("MASUK SINI");
        setLoading(false);
      } catch (error) {
        setNewQuarantine(false);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      kananX.value = -1;
      kananY.value = -18.5;
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      kananX.value = 1;
      kananY.value = -19.5;
    });
    return unsubscribe;
  }, [navigation]);

  async function addQuarantineButton() {
    try {
      // console.log("MASUK SINII0", origin, arrival);
      const value = await AsyncStorage.getItem("access_token");
      let resp = await axios(`${baseUrl}/trips/`, {
        method: "POST",
        headers: {
          access_token: value,
        },
        data: {
          tripOrigin: origin,
          tripDestination: arrival,
        },
      });
      navigation.navigate("MyTrips");
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        setErrorLogin(true);
      } else {
        setErrorLogin(false);
        navigation.navigate("MyTrips");
        console.log(error.message, "INI ERROR");
      }
    }
  }

  const rightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(kananX.value * 100) },
        { translateY: withSpring(kananY.value * 100) },
      ],
    };
  });
  const leftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(-1 * 100) },
        { translateY: withSpring(1 * 100) },
      ],
    };
  });

  if (loading) {
    return (
      <>
        <View
          flex={1}
          bg={{
            linearGradient: {
              colors: ["#0e3599", "#02023A"],
              start: [0, 0],
            },
          }}
        >
          <LottieView
            source={require("../../assets/loading_heartbeat.json")}
            autoPlay
            loop
          />
        </View>
      </>
    );
  }
  return (
    <>
      <SvgXml
        onPress={Keyboard.dismiss}
        style={{
          position: "relative",
          left: -1,
          top: -2,
          flex: 1,
        }}
        width="105%"
        height="105%"
        xml={backgroundSvg}
      ></SvgXml>

      <Animated.View
        style={
          ({
            position: "absolute",
            flex: 1,
            zIndex: 999,
            left: -10,
            top: 1,
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
            flex: 1,
            zIndex: 999999,
            left: 1,
            top: -0.9,
          },
          [leftStyle])
        }
      >
        <SvgXml width="150%" height="150%" xml={LeftTop}></SvgXml>
      </Animated.View>

      <SvgXml
        style={{
          position: "absolute",
          zIndex: 2,
          left: 50,
          top: 80,
        }}
        width="75%"
        height="75%"
        xml={loginForm}
      ></SvgXml>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 0, position: "absolute", zIndex: 2 }}>
          <TextInput
            style={{
              left: 70,
              top: 375,
              width: 250,
              // color: "red",
            }}
            onChangeText={onChangeOrigin}
            value={origin}
            placeholder="Origin"
            keyboardType="default"
          />

          <TextInput
            style={{
              left: 70,
              top: 425,
              width: 250,
            }}
            onChangeText={onChangeArrival}
            value={arrival}
            placeholder="Arrival Port"
            keyboardType="default"
          />
        </View>
      </TouchableWithoutFeedback>
      {newQuarantine ? (
        <>
          <Text
            style={{
              position: "absolute",
              zIndex: 2,
              left: 30,
              top: 520,
              color: "white",
              textAlign: "center",
              fontFamily: "Helvetica-Bold",
              fontSize: 25,
            }}
          >
            UNDERGOING QUARANTINE, PLEASE FOLLOW HEALTH PROTOCOL
          </Text>
        </>
      ) : (
        <SvgXml
          onPress={() => addQuarantineButton()}
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
      )}

      <Text
        style={{
          top: 780,
          left: 130,
          color: "white",
          position: "absolute",
          zIndex: 888,
        }}
        onPress={() => {
          kananY.value = -19.5;
          kananX.value = 0;
          setTimeout(() => {
            navigation.navigate("MyTrips");
            // navigation.navigate("Login");
          }, 500);
        }}
      >
        {" "}
        Back to My Quarantines
      </Text>
      {errorLogin ? (
        <Text
          style={{
            fontFamily: "Helvetica",
            position: "absolute",
            color: "white",
            fontWeight: "bold",
            zIndex: 50,
            left: 85,
            top: 500,
            fontSize: 10,
          }}
        >
          PLEASE INPUT ORIGIN AND ARRIVAL PORT
        </Text>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
