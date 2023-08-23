import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/state/store";
import Home from "./home";
import Login from "./src/startscreens/login";
import Signup from "./src/startscreens/signup";
import CustomBackArrow from "./assets/arrows/backarrow";
import ForgotPassword from "./src/startscreens/forgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
