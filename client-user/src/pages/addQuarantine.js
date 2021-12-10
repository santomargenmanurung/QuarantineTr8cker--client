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

export default function AddQuarantine({ navigation }) {
  // const navigation = useNavigation();
  const [origin, onChangeOrigin] = useState("");
  const [arrival, onChangeArrival] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [newQuarantine, setNewQuarantine] = useState(false);
  const [loading, setLoading] = useState(false);

  // const kananX = useSharedValue(-1);
  // const kananY = useSharedValue(-19.5);

  // const kiriX = useSharedValue(-3);
  // const kiriY = useSharedValue(-47);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        // console.log(value);
        setLoading(true);
        let resp = await axios.get(`http://192.168.100.77:3000/quarantines/`, {
          headers: {
            access_token: value,
          },
        });
        //JOKO FALSE
        console.log(
          resp.data[resp.data.length - 1].isQuarantined,
          "LIHAT DISINI"
        );
        if (!resp.data[resp.data.length - 1].isQuarantined) {
          setNewQuarantine(true);
        }
        // console.log("MASUK SINI");
        setLoading(false);
      } catch (error) {
        setNewQuarantine(false);
        setLoading(false);
        console.log(error, "SINI JANCUCUUU");
      }
    });
    return unsubscribe;
  }, [navigation]);

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
  async function addQuarantineButton() {
    try {
      const value = await AsyncStorage.getItem("access_token");
      let resp = await axios(`http://192.168.100.77:3000/trips/`, {
        method: "POST",
        headers: {
          access_token: value,
        },
        data: {
          tripOrigin: origin,
          tripDestination: arrival,
        },
      });
      if (resp.data) navigation.navigate("MyTrips");
    } catch (error) {
      console.log(error.message, "INI ERROR");
    }
  }

  // const rightStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       // { translateX: withSpring(2 * 100) },
  //       // { translateY: withSpring(-11 * 100) },
  //       { translateX: withSpring(kananX.value * 50) },
  //       { translateY: withSpring(kananY.value * 50) },
  //     ],
  //   };
  // });
  // const leftStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       // { translateX: withSpring(2 * 100) },
  //       // { translateY: withSpring(-11 * 100) },
  //       { translateX: withSpring(kiriX.value * 50) },
  //       { translateY: withSpring(kiriY.value * 50) },
  //     ],
  //   };
  // });

  if (loading) {
    return (
      <>
        <Text>Loading</Text>
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
        }}
        width="100%"
        height="100%"
        xml={backgroundSvg}
      ></SvgXml>
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
      {/* <Animated.View
        style={
          ({
            position: "absolute",
            zIndex: 99999,
            left: -1,
            top: 1,
          },
          [rightStyle])
        }
      >
        <SvgXml width="150%" height="150%" xml={RightTop}></SvgXml>
      </Animated.View> */}

      {/* <Animated.View
        style={
          ({
            position: "absolute",
            zIndex: 920,
            left: 1,
            top: -0.1,
          },
          [leftStyle])
        }
      >
        <SvgXml width="150%" height="150%" xml={LeftTop}></SvgXml>
      </Animated.View> */}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 0, position: "absolute", zIndex: 2 }}>
          <TextInput
            style={{
              // position: "absolute",
              // zIndex: 9999,
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
              // position: "absolute",
              // zIndex: 9999,
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
          navigation.navigate("MyTrips");
        }}
      >
        {" "}
        Back to My Quarantines
        {/* {JSON.stringify(newQuarantine)} */}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({});
