import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import store from "./src/state/store";
import Home from "./home";
import Login from "./src/startscreens/login";
import Signup from "./src/startscreens/signup";
import CustomBackArrow from "./assets/arrows/backarrow";
import ForgotPassword from "./src/startscreens/forgotPassword";
import ForgotFinal from "./src/startscreens/ForgotFinal";
import TopTabs from "./src/toptabs/TopTabs";
import CategoryInfo from "./src/toptabs/categoryInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#612cfe" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#612cfe",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotPassword}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="ForgotFinal"
            component={ForgotFinal}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="CategoryInfo"
            component={CategoryInfo}
            options={{
              title: "About",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={TopTabs}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#612cfe",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
