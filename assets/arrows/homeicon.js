import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomHomeIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
      <Entypo
        name="home"
        size={24}
        style={{
          color: "#fff",
          marginLeft: 0,
          paddingLeft: 0,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomHomeIcon;
