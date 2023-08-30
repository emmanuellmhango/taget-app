import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchClaims } from "../../src/state/fetchClaims";
import { addClaims } from "../../src/state/addClaimSlice";

const CustomHomeIcon = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserClaims = async () => {
      const response = await fetchClaims(user.id);
      if (response) {
        dispatch(addClaims(response));
      }
    };

    fetchUserClaims();
  }, []);

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
