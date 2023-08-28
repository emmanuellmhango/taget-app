import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ViewTag = ({ route }) => {
  const { imgOne, imgTwo, category, geoCode } = route.params;

  return (
    <View style={styles.calloutContainer}>
      <View style={styles.calloutView}>
        <Text style={styles.calloutText1}>Claim Submitted!</Text>
        <TouchableOpacity onPress={handleMapView}>
          <View style={styles.calloutButton}>
            <Text style={styles.calloutText}>View Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "#612cfe",
    borderRadius: 8,
    borderColor: "#612cfe",
    borderWidth: 2,
    padding: 8,
    width: 250,
    height: 100,
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

export default ViewTag;
