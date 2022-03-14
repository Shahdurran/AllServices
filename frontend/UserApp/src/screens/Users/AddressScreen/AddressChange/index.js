import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js';
import PlaceRow from "./PlaceRow";
import { windowWidth } from './../../../../utils/index';
import LocationPickerDemo from './../../../../components/HomeMap/test';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const LocationSearch = (props) => {
  const [orderPlace, setOrderPlace] = useState(null);

  const navigation = useNavigation();

  // const checkNavigation = () => {
  //   if (orderPlace) {
  //     navigation.navigate('Home', {
  //       orderPlace,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   checkNavigation();
  // }, [orderPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <GooglePlacesAutocomplete
          placeholder="Enter your address"
          onPress={(data, details = null) => {
            setOrderPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          containerStyle={styles.autocompleteContainer}
          fetchDetails
          query={{
            key: 'AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        /> */}
       

        {/* Circle near Origin input */}
        {/* <View style={styles.circle} /> */}

        {/* Line between dots */}
        {/* <View style={styles.line} /> */}

        {/* Square near Destination input */}
        {/* <View style={styles.square} /> */}
       <LocationPickerDemo data={navigation}/>
       {/* <HomeMap/> */}
      </View>
     </SafeAreaView>
  );
};

export default LocationSearch;
