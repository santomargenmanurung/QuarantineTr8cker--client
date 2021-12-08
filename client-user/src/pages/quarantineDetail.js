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
const axios = require("axios");
import {
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  barButtom,
  logout,
  cardCustom,
  backgroundSvg,
  triplist,
  addtrips,
  QuarantineCard,
} from "../../assets/quarantinedetail";

export default function Detail({ route }) {
  const navigation = useNavigation();
  const [myQuarantine, setMyQuarantine] = useState([]);
  const { user } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios({
        method: "GET",
        url: "http://192.168.100.77:3000/trips/",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJmZmZAYWRtaW4uY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2Mzg5NzY4MTN9.vh_o3leI2Th8I61yUgwYuijneQakDEI1p25d0VDnzl0",
        },
      })
        .then((data) => {
          // console.log(data.data, "INII");
          setMyQuarantine(data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
    return unsubscribe;
  }, [navigation]);

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
          zIndex: 1,
          left: -50,
          top: 410,
        }}
        width="130%"
        height="100%"
        xml={barButtom}
      ></SvgXml>
      <SvgXml
        onPress={() => navigation.navigate("MyTrips")}
        style={{
          position: "absolute",
          zIndex: 40,
          left: 50,
          top: 765,
        }}
        width="18%"
        height="18%"
        xml={triplist}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 40,
          left: 170,
          top: 736,
        }}
        width="30%"
        height="30%"
        xml={addtrips}
      ></SvgXml>
      <SvgXml
        onPress={() => navigation.navigate("Login")}
        style={{
          position: "absolute",
          zIndex: 40,
          left: 300,
          top: 795,
        }}
        width="12%"
        height="12%"
        xml={logout}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 40,
          left: 0,
          top: 0,
        }}
        width="100%"
        height="100%"
        xml={QuarantineCard}
      ></SvgXml>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 30,
          top: 185,
          fontSize: 20,
        }}
      >
        {myQuarantine[0]?.tripOrigin}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 300,
          top: 185,
          fontSize: 20,
        }}
      >
        {myQuarantine[0]?.tripDestination}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 40,
          top: 440,
        }}
      >
        {myQuarantine[0]?.name}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 25,
          fontSize: 10,
          top: 530,
        }}
      >
        {new Date(myQuarantine[0].startedAt).toDateString()}
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
