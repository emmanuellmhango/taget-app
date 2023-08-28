import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import store from "./src/state/store";
import Home from "./home";
import Login from "./src/startscreens/login";
import Signup from "./src/startscreens/signup";
import CustomBackArrow from "./assets/arrows/backarrow";
import CustomHomeIcon from "./assets/arrows/homeicon";
import ForgotPassword from "./src/startscreens/forgotPassword";
import ForgotFinal from "./src/startscreens/ForgotFinal";
import TopTabs from "./src/toptabs/TopTabs";
import CategoryInfo from "./src/toptabs/categoryInfo";
import ClaimFirstComponent from "./src/claims/ClaimFirstComponent";
import ClaimSecondComponent from "./src/claims/ClaimSecondComponent";
import ClaimDetails from "./src/claims/ClaimDetails";
import ClaimSubmitted from "./src/claims/ClaimSubmitted";
import ViewClaim from "./src/claims/ViewClaim";

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
            name="ClaimFirstComponent"
            component={ClaimFirstComponent}
            options={{
              title: "First Picture",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="ClaimSecondComponent"
            component={ClaimSecondComponent}
            options={{
              title: "Second Picture",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="ClaimDetails"
            component={ClaimDetails}
            options={{
              title: "Submit Tag",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="ClaimSubmitted"
            component={ClaimSubmitted}
            options={{
              title: "Submitted Tag",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <CustomHomeIcon />,
            }}
          />
          <Stack.Screen
            name="ViewClaim"
            component={ViewClaim}
            options={{
              title: "Explore Tag",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <CustomHomeIcon />,
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
