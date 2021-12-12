import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useRef } from "react";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
const axios = require("axios");
import { useNavigation } from "@react-navigation/native";
import {
  barButtom,
  mytrips,
  cardCustom,
  buttonNewQuarScreen,
  backgroundSvg,
  triplist,
  addtrips,
  logout,
} from "../../assets/mytrips";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { baseUrl } = require("../../assets/baseUrl");

// import { fetchMovies } from "../store/actionCreator/itemAction";

export default function Detail() {
  const navigation = useNavigation();
  const [myQuarantine, setMyQuarantine] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        // console.log(myQuarantine, "INI DIA TOLONG DI PIRENT");
        const value = await AsyncStorage.getItem("access_token");
        // console.log(value, "INI VALUNYE");
        let resp = await axios.get(`${baseUrl}/quarantines/`, {
          headers: {
            access_token: value,
          },
        });
        // console.log(resp.data, "DISINI ADA FETCH DATA");
        setMyQuarantine(resp.data);
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  function goToDetail(user) {
    // console.log(user);
    navigation.navigate("quarantineDetail", { user });
  }

  const logoutAction = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      // setFoundToken(""); //kalau logout
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SvgXml
        style={{
          position: "absolute",
          left: -1,
          top: -2,
          flex: 4,
        }}
        width="100%"
        height="100%"
        xml={backgroundSvg}
      ></SvgXml>
      <SvgXml
        style={{
          position: "absolute",
          flex: 1,
          left: 10,
          top: -350,
        }}
        width="50%"
        height="100%"
        xml={mytrips}
      ></SvgXml>

      <SafeAreaView
        style={{
          paddingTop: 10,
          top: 120,
          height: 900,
        }}
      >
        {myQuarantine.length == 0 ? (
          <>
            <Text
              style={{
                position: "absolute",
                zIndex: 999,
                left: 40,
                top: 200,
                fontSize: 18,
                fontFamily: "Helvetica",
                color: "white",
                fontWeight: "bold",
              }}
            >
              You dont have a quarantine history yet
            </Text>
            <Text
              style={{
                position: "absolute",
                zIndex: 999,
                left: 60,
                top: 250,
                fontSize: 12,
                fontFamily: "Helvetica",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Please click the link below to add new quarantine
            </Text>
            <SvgXml
              onPress={() => {
                navigation.navigate("AddQuarantine");
              }}
              style={{
                position: "absolute",
                zIndex: 566,
                flex: 1,
                left: 100,
                top: 100,
              }}
              width="50%"
              height="50%"
              xml={buttonNewQuarScreen}
            ></SvgXml>
          </>
        ) : (
          <FlatList
            style={{
              left: 5,
              paddingTop: 10,
            }}
            data={myQuarantine}
            renderItem={({ item }) => (
              <>
                {item.isQuarantined ? (
                  <Text
                    style={{
                      paddingTop: 20,
                      left: 10,
                    }}
                  >
                    {/* <Text>{JSON.stringify(item.isQuarantined)}</Text> */}
                    <View style={styles.rectangleDone} />
                  </Text>
                ) : (
                  <Text
                    onPress={() => goToDetail(item.id)}
                    style={{
                      paddingTop: 20,
                      left: 10,
                    }}
                  >
                    {/* <Text>{JSON.stringify(item.isQuarantined)}</Text> */}
                    <View style={styles.rectangle} />
                  </Text>
                )}

                <Text
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    left: 40,
                    top: 20,
                    fontSize: 18,
                    fontFamily: "Helvetica",
                    color: "#092475",
                    fontWeight: "bold",
                  }}
                >
                  {item.tripOrigin}
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    left: 40,
                    top: 50,
                    fontSize: 15,
                    fontFamily: "Helvetica",
                    color: "#092475",
                    fontWeight: "bold",
                  }}
                >
                  {/* {item.createdAt} */}
                  {new Date(item.createdAt).toDateString()}
                </Text>
              </>
            )}
          />
        )}
      </SafeAreaView>
      <SvgXml
        style={{
          position: "absolute",
          zIndex: 1,
          flex: 1,
          left: -50,
          top: 410,
        }}
        width="130%"
        height="100%"
        xml={barButtom}
      ></SvgXml>
      <SvgXml
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
        onPress={() => {
          navigation.navigate("AddQuarantine");
        }}
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
        onPress={() => {
          logoutAction();
        }}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6EEFD",
    padding: 10,
    paddingTop: 60,
  },
  rectangle: {
    width: 190 * 2,
    height: 100,
    borderRadius: 50,
    // paddingTop: 50,
    backgroundColor: "white",
  },
  rectangleDone: {
    width: 190 * 2,
    height: 100,
    borderRadius: 50,
    // paddingTop: 50,
    borderColor: "red",
    borderWidth: 5,
    backgroundColor: "white",
  },
});
