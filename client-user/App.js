import { useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import addQuarantine from "./src/pages/addQuarantine";
import register from "./src/pages/register";
import quarantineDetail from "./src/pages/quarantineDetail";
import login from "./src/pages/login";
import mytrips from "./src/pages/mytrips";
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
import { Provider } from "react-redux";
import store from "./src/store";

const AppWrap = () => {
  // const [foundToken, setFoundToken] = useState("");
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
};

export default function App() {
  // if (isLoad == true) {
  //   return (
  //     <>
  //       <Text>HALOOOOOOO SABAR YAAAA</Text>
  //     </>
  //   );
  // }

  // return (
  //   <NavigationContainer initialRouteName="Home">
  //     <HomeStack.Navigator>
  //       {!foundToken ? (
  //         <>
  //           {/* <Text>{JSON.stringify("ASSAS")}</Text> */}
  //           <HomeStack.Screen
  //             options={{ headerShown: false }}
  //             name="Login"
  //             component={login}
  //           />
  //           <HomeStack.Screen
  //             options={{ headerShown: false }}
  //             name="Register"
  //             component={register}
  //           />
  //         </>
  //       ) : (
  //         <>
  //           <HomeStack.Screen
  //             options={{ headerShown: false }}
  //             name="MyTrips"
  //             component={mytrips}
  //           />
  //           <HomeStack.Screen
  //             options={{ headerShown: false }}
  //             name="quarantineDetail"
  //             component={quarantineDetail}
  //           />
  //           <HomeStack.Screen
  //             options={{ headerShown: false }}
  //             name="AddQuarantine"
  //             component={addQuarantine}
  //           />
  //         </>
  //       )}
  //     </HomeStack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    <Provider store={store}>
      <AppWrap />
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
