import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Image} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector} from 'react-redux';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw';

const RouteMap = () => {
  const UserLocation = useSelector(state => state.address);

  const originLoc = {
    // latitude: origin.details.geometry.location.lat,
    // longitude: origin.details.geometry.location.lng,
    latitude: 24.822259781624936,
    longitude: 67.06345113025824,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };

  const destinationLoc = {
    latitude: UserLocation.lat,
    longitude: UserLocation.long,
    // latitude: 24.822259781624936,
    // longitude: 67.06345113025824,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: UserLocation.lat,
        longitude: UserLocation.long,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker coordinate={originLoc} title={'Origin'} />
      <Marker  coordinate={destinationLoc} title={'Destination'}/>
        

    </MapView>
  );
};

export default RouteMap;
