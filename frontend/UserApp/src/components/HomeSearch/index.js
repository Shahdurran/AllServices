import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import styles from './styles.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow.js';
import { useNavigation } from '@react-navigation/native';
// import SearchResults from './../SearchResults/index';


const HomeSearch = () => {

  const navigation = useNavigation();
  const [originPlace, setOriginPlace] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const checkNavigation = () =>{
     if (originPlace && destinationPlace) {
      // navigation.navigate('SearchResults' , {originPlace, destinationPlace})
    }
  }
  useEffect(() => {
   checkNavigation();
  }, [originPlace, destinationPlace]);
  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };
  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder="Where from"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setOriginPlace({data, details});
            console.log(data, details);
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autoCompleteContainer,
            listView: styles.listView,
          }}
          query={{
            key: 'AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data =>
            data.description || data.vicinity
          } /*putting data in input field of autocomplete*/
          predefinedPlaces={[homePlace, workPlace]}
        />
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder="Where to"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setDestinationPlace({data, details});
            console.log(data, details);
          }}
          styles={{
            textInput: styles.textInput,
            container: {...styles.autoCompleteContainer, top: 55},
          }}
          query={{
            key: 'AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          predefinedPlaces={[homePlace, workPlace]}
        />
        {/*Circle near Origin Input */}
        <View style={styles.circle} />
        {/* Line Between dots */}
        <View style={styles.line} />
        {/* square near destination input */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default HomeSearch;
