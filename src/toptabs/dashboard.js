import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AllClaims from "../state/allclaims";
import { styles } from "../../assets/css/styles";

const DashBoard = ({ navigation }) => {
  const claimsAll = useSelector((state) => state.claims.claims);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");

  useEffect(() => {
    if (claimsAll) {
      findMostOccurringCategory(claimsAll);
    }
  }, [claimsAll]);

  const handleAddButtonPress = () => {
    navigation.navigate("ClaimOne");
  };

  const findMostOccurringCategory = (data) => {
    const categoryCounts = data.reduce((counts, item) => {
      const { category } = item;
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    let maxCount = 0;
    let mostOccurringCategory = null;

    for (const category in categoryCounts) {
      if (categoryCounts[category] > maxCount) {
        maxCount = categoryCounts[category];
        mostOccurringCategory = category;
      }
    }
    setWeeklyClaims(`Weekly Claims: ${data.length}`);
    setTopCategory(`Top Category: ${mostOccurringCategory || "--"}`);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cameraIcon}>
        <View style={styles.cameraDiv}>
          <TouchableOpacity onPress={handleAddButtonPress}>
            <Ionicons name="camera" style={styles.cameraIconStyling} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.claimsContainer}>
        {claimsAll?.length < 1 || claimsAll === null ? (
          <View style={styles.NoContentFlyItemContainer}>
            <Text style={styles.NoClaimsFlyText}>
              You havent made a Tag Yet
            </Text>
          </View>
        ) : (
          <AllClaims claims={claimsAll} />
        )}
      </View>
      <View style={styles.modal}>
        <View style={styles.analytics}>
          <MaterialCommunityIcons
            name="google-analytics"
            size={28}
            style={styles.analyticsIcon}
          />
          <TextInput style={styles.inputModal} value={weeklyClaims} />
        </View>
        <View style={styles.topCategory}>
          <Ionicons
            name="ios-grid-outline"
            size={28}
            style={styles.analyticsIcon}
          />
          <TextInput style={styles.inputModal} value={topCategory} />
        </View>
        <View style={styles.topCategory}>
          <View style={styles.instructionsView}>
            <Text style={styles.instruction}>
              To press a Tag, press the camera button
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoard;
