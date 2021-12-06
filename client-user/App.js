import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import register from "./src/pages/register";
import quarantineDetail from "./src/pages/quarantineDetail";
import login from "./src/pages/login";
import mytrips from "./src/pages/mytrips";
const HomeStack = createNativeStackNavigator();
// const Tabsss = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={login}
        />
        <HomeStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={register}
        />
        {/* <HomeStack.Screen
          options={{ headerShown: false }}
          name="quarantineDetail"
          component={quarantineDetail}
        /> */}
        <HomeStack.Screen
          options={{ headerShown: false }}
          name="MyTrips"
          component={mytrips}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
