import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput } from "react-native";
import { styles } from "../../assets/css/styles";
import MapView, { Marker, Callout } from "react-native-maps";
import CustomCallout from "./CustomCallout";

const ClaimSubmitted = ({ navigation, route }) => {
  const { imgOne, imgTwo, location, geoCode, category } = route.params;

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.exploreContainer}>
        <View style={styles.aboutInfoBody}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <CustomCallout
                navigation={navigation}
                imgOne={imgOne}
                imgTwo={imgTwo}
                location={location}
                geoCode={geoCode}
                category={category}
              />
            </Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
};

export default ClaimSubmitted;
