import React, { useState, useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignUpScreen from "./screens/signUpScreen";
import SignInScreen from "./screens/signInScreen";
import ForgotPasswordScreen from "./screens/forgotPasswordScreen";
import TabContainer from "./screens/tabContainer";
import ModelSecreen from "./screens/modelScreen";
import ResultsScreen from "./screens/apiResultsScreen";
import { Link } from "expo-router";


const Stack = createNativeStackNavigator();

export default function Page() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Implement your refresh logic here
    // For example, you can fetch new data from the server

    // After the refresh is done, setRefreshing to false to stop the loading indicator
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setInitializing(false);
      } else {
        // User is signed out
        setUser(null);
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="tabContainer"
            component={TabContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modelScreen"
            component={ModelSecreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="resultsScreen"
            component={ResultsScreen}
            options={{ presentation: "modal" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="signInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});