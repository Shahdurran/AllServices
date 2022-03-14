import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from './../screens/Users/HomeScreen/index';
import UserAddress from './../screens/Users/AddressScreen/index';
import Search from './../screens/Users/SearchScreen/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import LocationSearch from './../screens/Users/AddressScreen/AddressChange/index';
import {useSelector} from 'react-redux';
import Details from './../screens/Users/DetailsScreen/index';

const HomeStack = createStackNavigator();

const leftHeaderClose = () => {
  const navigation = useNavigation();
  return (
    <Icon.Button
      name="close-outline"
      size={25}
      color="#E60023"
      backgroundColor="#fff"
      style={{paddingLeft: 11}}
      onPress={() => navigation.goBack()}></Icon.Button>
  );
};
const leftHeaderBack = () => {
  const navigation = useNavigation();
  return (
    <Icon.Button
      name="arrow-back-outline"
      size={25}
      color="#E60023"
      backgroundColor="#fff"
      style={{paddingLeft: 11}}
      onPress={() => navigation.goBack()}></Icon.Button>
  );
};

const HomeStackScreen = ({navigation}) => {
  const latitude = useSelector(state => state.address.lat);
  const longitude = useSelector(state => state.address.long);
  const [Address, setAddress] = useState('Set Location');

console.log(latitude,longitude);
  useEffect(() => {
    if (latitude && longitude != null) {
      getAddress();
    }

  }, [latitude, longitude]);
  
  const getAddress = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=AIzaSyBZMCvJi4ldI-U_ohzKWYNZ6oeBrLeZtyw`,
    )
      .then(response => response.json())
      .then(responseJson =>
        setAddress(
          JSON.stringify(responseJson.results[1].formatted_address).replace(
            /"/g,
            '',
          ),
        ),
      );
  };
  // console.log(Address);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={UserHomeScreen}
        options={{
          headerTitle: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressChange')}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>
                <Icon2 name="map-marker" color="red" size={20} />{' '}
                {Address.slice(0, 25)}..
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color="#000"
              style={{paddingLeft: 15}}
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
        }}
      />
      <HomeStack.Screen
        name="AddressChange"
        component={UserAddress}
        options={{
          headerTitle: props => (
            <TouchableOpacity>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>
                <Icon2 name="map-marker" color="red" size={20} />{' '}
                {Address.slice(0, 25)}..
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => leftHeaderClose(),
        }}
      />
      <HomeStack.Screen
        name="AddressChangeMap"
        component={LocationSearch}
        options={{
          headerTitle: props => (
            <TouchableOpacity>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>
                <Icon2 name="map-marker" color="red" size={20} />{' '}
                {Address.slice(0, 25)}..
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => leftHeaderClose(),
        }}
      />
      <HomeStack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressChange')}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>
                <Icon2 name="map-marker" color="red" size={20} />{' '}
                {Address.slice(0, 25)}..
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => leftHeaderBack(),
        }}
      />
      <HomeStack.Screen
        name="Order"
        component={Details}
        options={{
          headerTitle: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressChange')}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 14}}>
                <Icon2 name="map-marker" color="red" size={20} />{' '}
                {Address.slice(0, 25)}..
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => leftHeaderBack(),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
