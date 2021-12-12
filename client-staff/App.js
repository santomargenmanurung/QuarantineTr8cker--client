import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import QRScanner from "./components/QRScanner";
import OfficerForm from "./screens/OfficerForm";
import InterviewForm from "./screens/InterviewForm";
import BriefingForm from "./screens/BriefingForm";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
import LoginBasic from "./screens/LoginBasic";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="OfficerForm" component={OfficerForm} />
      <Stack.Screen name="InterviewForm" component={InterviewForm} />
      <Stack.Screen name="BriefingForm" component={BriefingForm} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator

          >
            <Stack.Screen name="LoginBasic" component={LoginBasic} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="QRScanner" component={QRScanner} />
            <Stack.Screen name="OfficerForm" component={OfficerForm} />
            <Stack.Screen name="InterviewForm" component={InterviewForm} />
            <Stack.Screen name="BriefingForm" component={BriefingForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
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
