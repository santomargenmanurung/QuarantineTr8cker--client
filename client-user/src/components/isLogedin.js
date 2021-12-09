import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

export default async function RequireAuth({ children }) {
  const value = await AsyncStorage.getItem("access_token");
  if (value) {
    return (
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="MyTrips"
        component={mytrips}
      />
    );
  }
  return children;
}
