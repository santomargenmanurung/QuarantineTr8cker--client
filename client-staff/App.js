import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './screens/HomeScreen';
import QRScanner from './components/QRScanner';
import OfficerForm from './screens/OfficerForm';
import InterviewForm from './screens/InterviewForm';
import BriefingForm from './screens/BriefingForm';
import { StyleSheet, Text, View } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="QRScanner" component={QRScanner} />
    <Stack.Screen name="OfficerForm" component={OfficerForm} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
          <Stack.Screen name="OfficerForm" component={OfficerForm} />
          <Stack.Screen name="InterviewForm" component={InterviewForm} /> */}
          <Stack.Screen name="BriefingForm" component={BriefingForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
