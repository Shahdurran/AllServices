import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {changeLocation} from '../../redux/reducers/addressReducer';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
// const location = useSelector(state => state.address);

//  Geocoder.init('AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw', {language : "en"});

class LocationPickerDemo extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: this.props.location.lat,
      longitude: this.props.location.long,
    },
    listViewDisplayed: true,
    address: '',
    showAddress: false,
    search: '',
    currentLat: '',
    currentLng: '',
    forceRefresh: 0,
  };

  goToInitialLocation = region => {
    let initialRegion = Object.assign({}, region);
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  };
  getAddress = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.region.latitude},${this.state.region.longitude}&key=AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw`,
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log(
        //   'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
        // );
        this.setState({
          address: JSON.stringify(
            responseJson.results[1].formatted_address,
          ).replace(/"/g, ''),
        });
      });
  };
  onRegionChange = region => {
    this.setState(
      {
        region: region,
        forceRefresh: Math.floor(Math.random() * 100),
      },
      this.getAddress, //callback
    );
  };
  componentdidMount() {
    this.getAddress();
  }

  render() {
    const {region} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.panel}>
          <View
            style={[
              styles.panelHeader,
              this.state.listViewDisplayed ? styles.panelFill : styles.panel,
            ]}>
            <GooglePlacesAutocomplete
              currentLocation={false}
              enableHighAccuracyLocation={true}
              ref={c => (this.searchText = c)}
              placeholder="Enter address here"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'}
              listViewDisplayed={this.state.listViewDisplayed}
              fetchDetails={true}
              renderDescription={row => row.description}
              enablePoweredByContainer={false}
              listUnderlayColor="lightgrey"
              onPress={(data, details) => {
                this.setState({
                  listViewDisplayed: false,
                  address: data.description,
                  currentLat: details.geometry.location.lat,
                  currentLng: details.geometry.location.lng,
                  region: {
                    latitudeDelta,
                    longitudeDelta,
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  },
                });
                this.searchText.setAddressText('');
                this.goToInitialLocation(this.state.region);
              }}
              textInputProps={{
                onChangeText: text => {
                  console.log(text);
                  this.setState({listViewDisplayed: true});
                },
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                key: 'AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw',
                language: 'en', // language of the results
                components: 'country:pak',
              }}
              styles={{
                description: {
                  fontFamily: 'Calibri',
                  color: 'black',
                  fontSize: 12,
                },
                predefinedPlacesDescription: {
                  color: 'black',
                },
                listView: {
                  position: 'absolute',
                  marginTop: 44,
                  backgroundColor: 'white',
                  borderBottomEndRadius: 15,
                  elevation: 2,
                  zIndex: 1,
                },
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'building',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]}
              debounce={200}
            />
          </View>
          <Icon
            name="search"
            size={23}
            style={{alignSelf: 'flex-end', top: 9, right: 18}}
            color="#E60023"></Icon>
        </View>

        <MapView
          ref={ref => (this.mapView = ref)}
          onMapReady={() => this.goToInitialLocation(this.state.region)}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />

        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require('../../assets/pinmarker.png')}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.props.dispatch(changeLocation(this.state));
              this.props.data.navigate('Home');
            }}
            style={{
              width: '80%',
              height: 35,
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: '#E60023',
              borderRadius: 5,
              shadowColor: 'rgba(0,0,0, .4)', // IOS
              shadowOffset: {height: 1, width: 1}, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2, // Android
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Calibri',
                fontWeight: 'bold',
                fontSize: 14,
                paddingVertical: 7,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    location: state.address,
  };
};
// const mapDispatchToProps = dispatch => {
//   return(
//     changeLocation: (r,a) => dispatch(changeAddress({r,a}))
//   );
// };

export default connect(mapStateToProps)(LocationPickerDemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    marginTop: 40,
    height: '100%',
    width: '100%',
  },
  marker: {
    width: 35,
    height: 35,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -18,
    marginTop: -50,
    position: 'absolute',
    top: '60%',
  },
  addressText: {
    color: 'black',
    margin: 3,
    fontFamily: 'Calibri',
  },
  footer: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
  },
  panelFill: {
    position: 'absolute',
    top: 0,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  panel: {},
  panelHeader: {
    //add custom header
  },
});
