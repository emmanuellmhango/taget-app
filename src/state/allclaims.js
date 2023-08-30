import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/css/styles";
//import SVG Icons
import Accident from "../../assets/icons/Accident.svg";
import Animals from "../../assets/icons/Animals.svg";
import Building from "../../assets/icons/Building.svg";
import Ecology from "../../assets/icons/Ecology.svg";
import Electricity from "../../assets/icons/Electricity.svg";
import Gas from "../../assets/icons/Gas.svg";
import Road from "../../assets/icons/Road.svg";
import Water from "../../assets/icons/Water.svg";
import Safety from "../../assets/icons/Safety.svg";
import Security from "../../assets/icons/Security.svg";

const AllClaims = ({ claims }) => {
  const navigation = useNavigation();

  const viewOnMap = (claim) => {
    navigation.navigate("ViewClaim", { claim });
  };

  return (
    <View style={styles.modalFly}>
      <Text style={styles.flyTitle}>Recent Tags</Text>
      <View style={styles.flyContainer}>
        <ScrollView>
          {claims &&
            claims.map((claim, index) => (
              <TouchableOpacity onPress={() => viewOnMap(claim)} key={index}>
                <View style={styles.flyItemContainer}>
                  <View style={styles.flyItem}>
                    <View style={styles.flyImageContainer}>
                      {claim.category.name === "accident" && <Accident />}
                      {claim.category.name === "water" && <Water />}
                      {claim.category.name === "road" && <Road />}
                      {claim.category.name === "security" && <Security />}
                      {claim.category.name === "safety" && <Safety />}
                      {claim.category.name === "gas" && <Gas />}
                      {claim.category.name === "electricity" && <Electricity />}
                      {claim.category.name === "ecology" && <Ecology />}
                      {claim.category.name === "building" && <Building />}
                      {claim.category.name === "animals" && <Animals />}
                    </View>
                    <View style={styles.flyTextContainer}>
                      <Text style={styles.flyText}>Claim_000{index + 1}</Text>
                      <Text style={styles.flyTextClaims}>{claim.geocode}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AllClaims;
