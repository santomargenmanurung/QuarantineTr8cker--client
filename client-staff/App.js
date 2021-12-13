import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { Provider } from "react-redux";
import store from "./store";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import QRScanner from "./components/QRScanner";
import OfficerForm from "./screens/OfficerForm";
import InterviewForm from "./screens/InterviewForm";
import BriefingForm from "./screens/BriefingForm";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
import LoginBasic from "./screens/LoginBasic";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

//nativebase config
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="QRScanner" component={QRScanner} />
//       <Stack.Screen name="OfficerForm" component={OfficerForm} />
//       <Stack.Screen name="InterviewForm" component={InterviewForm} />
//       <Stack.Screen name="BriefingForm" component={BriefingForm} />
//     </Stack.Navigator>
//   );
// }

const AppWrap = () => {
  const [isLoad, setIsLoad] = useState(true);
  const { access_token } = useSelector((state) => state); //INI DIAAAA
  useEffect(() => {
    // checkToken();
    console.log("JALAN GA?", access_token);
  }, [access_token]);

  return (
    <NavigationContainer initialRouteName="Home">
      <HomeStack.Navigator>
        {!access_token ? (
          <>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="LoginBasic"
              component={LoginBasic}
            />
          </>
        ) : (
          <>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="QRScanner"
              component={QRScanner}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="OfficerForm"
              component={OfficerForm}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="InterviewForm"
              component={InterviewForm}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="BriefingForm"
              component={BriefingForm}
            />
          </>
        )}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    // <Provider store={store}>
    //   <NativeBaseProvider config={config}>
    //     <NavigationContainer>
    //       <Stack.Navigator
    //         screenOptions={{
    //           headerShown: false,
    //         }}
    //       >
    //         {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
    //         <Stack.Screen name="LoginBasic" component={LoginBasic} />
    //         <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //         <Stack.Screen name="QRScanner" component={QRScanner} />
    //         <Stack.Screen name="OfficerForm" component={OfficerForm} />
    //         <Stack.Screen name="InterviewForm" component={InterviewForm} />
    //         <Stack.Screen name="BriefingForm" component={BriefingForm} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </NativeBaseProvider>
    // </Provider>
    <Provider store={store}>
      <NativeBaseProvider config={config}>
        <AppWrap />
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
