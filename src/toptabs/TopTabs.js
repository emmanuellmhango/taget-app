import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, StatusBar } from "react-native"; // Import StatusBar
import DashBoard from "./dashboard";
import Explore from "./explore";
import About from "./about";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <>
      <StatusBar backgroundColor="#612cfe" hidden={false} />

      <Tab.Navigator
        initialRouteName="Tags"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#f5f5f5",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                focused ? { fontWeight: "bold" } : { fontWeight: "normal" },
                { color: color },
              ]}
            >
              {route.name}
            </Text>
          ),
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: "#612cfe",
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#fff",
          },
        })}
      >
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Tags" component={DashBoard} />
        <Tab.Screen name="Explore" component={Explore} />
      </Tab.Navigator>
    </>
  );
};

export default TopTabs;
