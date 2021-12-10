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
const { baseUrl } = require("../../assets/baseUrl");
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
  baseLogo,
} from "../../assets/quarantinedetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

export default function Detail({ route }) {
  const navigation = useNavigation();
  const [myQuarantine, setMyQuarantine] = useState([]);
  const [quarStatus, setQuarStatus] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const { user } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        setIsloading(true);
        const value = await AsyncStorage.getItem("access_token");
        let resp1 = await axios.get(`${baseUrl}/quarantines/`, {
          headers: {
            access_token: value,
          },
        });
        // let
        const getId = resp1.data.find((e) => e.id === user);
        setMyQuarantine(getId);
        let resp = await axios.get(`${baseUrl}/users/${getId.userId}`, {
          headers: {
            access_token: value,
          },
        });
        console.log(getId, "myquar");
        setQuarStatus(resp.data);
        // console.log(quarStatus, "quarStatus");
        if (quarStatus) setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoading)
    return (
      <>
        <Text>LOADING SOB</Text>
      </>
    );

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
        onPress={() => navigation.navigate("AddQuarantine")}
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
        {myQuarantine?.tripOrigin}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#0E3599",
          fontWeight: "bold",
          zIndex: 50,
          left: 100,
          top: 300,
          fontSize: 25,
        }}
      >
        {myQuarantine?.User.status}
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
        {myQuarantine?.tripDestination}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          justifyContent: "center",
          zIndex: 50,
          left: 40,
          top: 440,
        }}
      >
        {myQuarantine?.User?.name}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 315,
          top: 440,
        }}
      >
        {myQuarantine?.roomNumber}
      </Text>
      {/* disini */}
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 110,
          top: 440,
        }}
      >
        {myQuarantine?.QuarantineLocation?.name}
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
        {new Date(myQuarantine?.createdAt).toDateString()}
      </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 150,
          fontSize: 10,
          top: 530,
        }}
      >
        {myQuarantine.quarantineUntil
          ? new Date(myQuarantine?.quarantineUntil).toDateString()
          : null}
      </Text>
      <Text
        style={{
          position: "absolute",
          zIndex: 50,
          left: 150,
          top: 660,
        }}
      >
        <QRCode value={JSON.stringify(quarStatus)} logo={baseLogo} />
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
