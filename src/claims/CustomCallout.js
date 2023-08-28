import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
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

const CustomCallout = ({
  navigation,
  imgOne,
  imgTwo,
  category,
  geoCode,
  location,
}) => {
  return (
    <View style={styless.calloutContainer}>
      <View style={styless.calloutView}>
        <View style={styles.exploreImageContainer}>
          <Image
            source={{ uri: imgOne }}
            style={styles.imgClaim1}
            alt="Claim Image"
          />
          <Image
            source={{ uri: imgTwo }}
            style={styles.imgClaim2}
            alt="Claim Image"
          />
        </View>

        <View style={styles.detailsCalloutContainer}>
          <View style={styles.detailsCalloutCategory}>
            <Text style={styles.detailsCalloutText}>Category</Text>
            <TextInput style={styles.inputModalCalloutA} value={category} />
          </View>
          <View style={styles.detailsCalloutCategoryA}>
            {category === "accident" && <Accident />}
            {category === "water" && <Water />}
            {category === "road" && <Road />}
            {category === "security" && <Security />}
            {category === "safety" && <Safety />}
            {category === "gas" && <Gas />}
            {category === "electricity" && <Electricity />}
            {category === "ecology" && <Ecology />}
            {category === "building" && <Building />}
            {category === "animals" && <Animals />}
          </View>
        </View>
        <View style={styles.detailsCalloutContainer}>
          <View style={styles.detailsCalloutCategory}>
            <Text style={styles.detailsCalloutText}>Location</Text>
            <TextInput style={styles.inputModalCallout} value={geoCode} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "#612cfe",
    borderRadius: 8,
    borderColor: "#612cfe",
    borderWidth: 2,
    padding: 8,
    width: 250,
    height: 290,
  },
  calloutButton: {
    width: 150,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  calloutView: {
    flexDirection: "column",
    alignItems: "center",
    width: 250,
  },
  calloutText1: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  calloutText: {
    color: "#612cfe",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomCallout;
