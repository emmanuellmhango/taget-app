import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, View, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Spinner from "react-native-loading-spinner-overlay";
import ViewTag from "../claims/ViewTag";
import { styles } from "../../assets/css/styles";
import IconMarker from "../../assets/appimages/marker.png";

function Explore() {
  const [location, setLocation] = useState(null);
  const [cleanClaims, setCleanClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { claims } = useSelector((state) => state.claims);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const locationResult = await Location.getCurrentPositionAsync({});
      return locationResult;
    } else {
      alert(
        "Permission to access location was denied. Please allow it to proceed"
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const getLocalLocation = async () => {
      const locat = await getLocationAsync();
      setLocation(locat);
    };

    getLocalLocation();
    setLoading(false);
  }, []);

  const cleanClaimLocation = () => {
    if (claims) {
      const cleanLocation = claims.map((claim) => {
        try {
          const parsedLocation = JSON.parse(claim.location);
          const newClaim = {
            ...claim,
            location: parsedLocation,
          };
          return newClaim;
        } catch (error) {
          console.error("Error parsing location:", error);
        }
      });
      return cleanLocation;
    }
  };

  useEffect(() => {
    const cleanedClaims = () => {
      const res = cleanClaimLocation();
      setCleanClaims(res);
    };

    cleanedClaims();
  }, [claims]);

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.exploreContainer}>
        <View style={styles.aboutInfoBody}>
          {location && (
            <MapView
              style={styles.mapStyle}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={() => setSelectedMarker(null)}
            >
              {cleanClaims?.length < 1 ||
              cleanClaims === null ||
              cleanClaims === undefined ? (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="You are here"
                />
              ) : (
                cleanClaims.map((claim, id) => (
                  <Marker
                    coordinate={{
                      latitude: claim.location.latitude,
                      longitude: claim.location.longitude,
                    }}
                    key={id}
                    onPress={() => setSelectedMarker(id)}
                    image={IconMarker}
                  >
                    {selectedMarker !== null && (
                      <ViewTag
                        imgOne={cleanClaims[selectedMarker].images[0]}
                        imgTwo={cleanClaims[selectedMarker].images[0]}
                        geoCode={cleanClaims[selectedMarker].geocode}
                        category={cleanClaims[selectedMarker].category.name}
                      />
                    )}
                  </Marker>
                ))
              )}
            </MapView>
          )}
          {!location && (
            <View style={styles.locationLoading}>
              <Text style={styles.aboutInfoText}> map loading ... </Text>
            </View>
          )}
        </View>
      </View>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
    </View>
  );
}

export default Explore;
