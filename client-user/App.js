import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import addQuarantine from "./src/pages/addQuarantine";
import register from "./src/pages/register";
import quarantineDetail from "./src/pages/quarantineDetail";
import login from "./src/pages/login";
import mytrips from "./src/pages/mytrips";
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";
import isLogedin from "./src/components/isLogedin";

export default function App() {
  const [foundToken, setFoundToken] = useState("");
  const [isLoad, setIsLoad] = useState(true);

  const checkToken = async () => {
    try {
      console.log("MASUKKKK");
      let findingToken = await AsyncStorage.getItem("access_token");
      // console.log(findingToken, "INI DI APPP");
      setFoundToken(findingToken); //kalau sudah login
      setIsLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutAction = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      setFoundToken(""); //kalau logout
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {
  //         foundToken
  //         ?<Stack.Screen name="Home">
  //           {props => <HomeScreen {...props} logout={logoutAction} />}
  //         </Stack.Screen>
  //         :(isLoad
  //          ?<Stack.Screen
  //             name="Load"
  //             options={{headerShown:false}}>
  //             {props => <LoadScreen {...props}/>}
  //           </Stack.Screen>
  //          :<Stack.Screen name="Login">
  //             {props => <LoginScreen {...props} login={loginAction} />}
  //           </Stack.Screen>
  //         )
  //       }
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  // if (isLoad == true) {
  //   return (
  //     <>
  //       <Text>HALOOOOOOO SABAR YAAAA</Text>
  //     </>
  //   );
  // }

  return (
    <NavigationContainer initialRouteName="Home">
      <HomeStack.Navigator>
        {!foundToken ? (
          <>
            {/* <Text>{JSON.stringify("ASSAS")}</Text> */}
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
          </>
        ) : (
          <>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="MyTrips"
              component={mytrips}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="quarantineDetail"
              component={quarantineDetail}
            />
            <HomeStack.Screen
              options={{ headerShown: false }}
              name="AddQuarantine"
              component={addQuarantine}
            />
          </>
        )}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer initialRouteName="Home">
  //     <HomeStack.Navigator>
  //       <HomeStack.Screen
  //         options={{ headerShown: false }}
  //         name="Login"
  //         component={login}
  //       />
  //       <HomeStack.Screen
  //         options={{ headerShown: false }}
  //         name="Register"
  //         component={register}
  //       />
  //       <HomeStack.Screen
  //         options={{ headerShown: false }}
  //         name="quarantineDetail"
  //         component={quarantineDetail}
  //       />
  //       <HomeStack.Screen
  //         options={{ headerShown: false }}
  //         name="MyTrips"
  //         component={mytrips}
  //       />
  //       <HomeStack.Screen
  //         options={{ headerShown: false }}
  //         name="AddQuarantine"
  //         component={addQuarantine}
  //       />
  //     </HomeStack.Navigator>
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
