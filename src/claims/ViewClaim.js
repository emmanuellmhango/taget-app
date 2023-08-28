import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput } from "react-native";
import { styles } from "../../assets/css/styles";
import MapView, { Marker, Callout } from "react-native-maps";
import ViewTag from "./ViewTag";
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

const ViewClaim = ({ route }) => {
  const { claim } = route.params;

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.exploreContainer}>
        <View style={styles.aboutInfoBody}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: claim.location.coords.latitude,
              longitude: claim.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: claim.location.coords.latitude,
                longitude: claim.location.coords.longitude,
              }}
              title={category}
            >
              <ViewTag
                imgOne={claim.images[0]}
                imgTwo={claim.images[0]}
                geoCode={claim.geoCode}
                category={claim.category.name}
              />
            </Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
};

export default ViewClaim;
