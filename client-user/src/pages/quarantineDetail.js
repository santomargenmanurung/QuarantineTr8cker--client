import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
const axios = require("axios");
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Center } from "native-base";
import { SvgXml } from "react-native-svg";
const { baseUrl } = require("../../assets/baseUrl");
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  barButtom,
  logout,
  backgroundSvg,
  triplist,
  addtrips,
  QuarantineCard,
  baseLogo,
} from "../../assets/quarantinedetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { setToken } from "../store/actionCreator/itemAction";
import LottieView from "lottie-react-native";

export default function Detail({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [myQuarantine, setMyQuarantine] = useState([]);
  const [quarStatus, setQuarStatus] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
        // console.log(getId, "myquar");
        setQuarStatus(resp.data);
        // console.log(quarStatus, "quarStatus");
        if (quarStatus) setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // loadData();
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
    setQuarStatus(resp.data);
    if (quarStatus) setIsloading(false);
    setRefreshing(false);
  }, []);

  const logoutAction = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      dispatch(setToken("")); //*************** */

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
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

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ width: windowWidth, height: windowHeight }}>
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
          onPress={() => logoutAction()}
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
            left: 5,
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
            width: windowWidth,
            flex: 1,
            top: 300,
            // left: 100,
            textAlign: "center",
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
            // backgroundColor: "red",
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
            // backgroundColor: "red",
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
        <Text
          style={{
            fontFamily: "Helvetica",
            position: "absolute",
            // backgroundColor: "red",
            textAlign: "center",
            color: "#092475",
            fontWeight: "bold",
            zIndex: 50,
            width: windowWidth,
            // flex: 1,
            // left: 110,
            top: 440,
          }}
        >
          {myQuarantine?.QuarantineLocation?.name}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "Helvetica",
          position: "absolute",
          color: "#092475",
          fontWeight: "bold",
          zIndex: 50,
          left: 30,
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
          left: 155,
          fontSize: 10,
          top: 530,
        }}
      >
        {myQuarantine.quarantineUntil
          ? new Date(myQuarantine?.quarantineUntil).toDateString()
          : null}
      </Text>
      <View
        style={{
          position: "absolute",
          zIndex: 50,
          left: 160,
          top: 660,
          // height: 600,
        }}
      >
        <QRCode value={JSON.stringify(quarStatus)} logo={baseLogo} ecl="L" />
      </View>
    </ScrollView>
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
