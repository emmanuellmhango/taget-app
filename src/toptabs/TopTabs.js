import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, StatusBar, Dimensions } from "react-native";
import DashBoard from "./dashboard";
import Explore from "./explore";
import About from "./about";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const windowWidth = Dimensions.get("window").width;
  const tabWidth = windowWidth / 3;

  return (
    <>
      <StatusBar backgroundColor="#612cfe" hidden={false} />

      <Tab.Navigator
        initialRouteName="Tags"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#f5f5f5",
          tabBarLabelStyle: {
            fontSize: 18,
            width: tabWidth,
          },
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                focused ? { fontWeight: "400" } : { fontWeight: "normal" },
                { color: color },
              ]}
            >
              {route.name}
            </Text>
          ),
          tabBarScrollEnabled: false,
          tabBarStyle: {
            backgroundColor: "#612cfe",
            width: "100%",
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
