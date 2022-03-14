/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import RootNavigator from './src/navigation/root';

import {
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Image,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Maindrawer from './src/navigation/drawer';
import {store} from './src/redux/store';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {addAddress} from './src/redux/reducers/addressReducer';
import {addToken} from './src/redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Details from './src/screens/Users/DetailsScreen';

// import DrawerContent from './src/navigation/drawerItem';
// import {AuthContext} from './src/components/context/AuthContext';
// import TabScreen from './src/navigation/mainTab';
// import UserOrders from './src/screens/Users/OrdersScreen/index';
// import Vouchers from './src/screens/Users/VouchersScreen/index';
// import UserHelp from './src/screens/Users/HelpScreen/index';
// import UserSettings from './src/screens/Users/SettingsScreen/index';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import UserAddress from './src/screens/Users/AddressScreen/index';
// import UserHomeScreen from './src/screens/Users/HomeScreen/index';
// import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon2 from 'react-native-vector-icons/FontAwesome';
// import {TouchableOpacity} from 'react-native';
// import Search from './src/screens/Users/SearchScreen/index';
// import NavigationHeader from './src/assets/lib/NavigationHeader';
// import AddressList from './src/components/lists/addressList/index';

navigator.geolocation = require('@react-native-community/geolocation');

// const Drawer = createDrawerNavigator();
// const HomeStack = createStackNavigator();

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  // console.log(latitude);
  useEffect(() => {
    getUserId();
  }, []);

  //using use effect to trigger when app first loads to ask for permission
  useEffect(() => {
    // for android
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      //IOS
      Geolocation.requestAuthorization();
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude != null) {
      dispatch(addAddress({latitude, longitude}));
    }
  }, [latitude, longitude]);

  const getUserId = async () => {
    try {
      const res = await AsyncStorage.getItem('userId');
      dispatch(addToken({res}));
    } catch (e) {
      console.log('No token', e);
    }
  };

  const getGeoLocation = () => {
    const config = {
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 3600000,
    };
    Geolocation.getCurrentPosition(
      info => {
        // setLocation({currentLocation: info});

        setLatitude({latitude: info.coords.latitude});
        setLongitude({longitude: info.coords.longitude});
      },
      error => console.log('ERROR', error),
      config,
    );
  };

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'All Service location Permission',
          message:
            'All Service needs access to your location ' +
            'to find service providers near you.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getGeoLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <NavigationContainer>
      {/* <RootNavigator /> */}
      {token ? <Maindrawer /> : <RootNavigator />}
      {/* <Maindrawer /> */}
      {/* <Details/> */}
    </NavigationContainer>
  );
};

export default App;
