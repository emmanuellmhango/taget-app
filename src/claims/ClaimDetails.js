import React from "react";
import { View, Text } from "react-native";

const ClaimDetails = ({ navigation, route }) => {
  const { images } = route.params;
  return (
    <View>
      <Text>ClaimDetails</Text>
    </View>
  );
};

export default ClaimDetails;
