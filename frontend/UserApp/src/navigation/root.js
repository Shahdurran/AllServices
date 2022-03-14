import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './../screens/LoginScreen/index';
import SignupScreen from './../screens/Users/SignupScreen/index';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Splash from './../screens/SplashScreen/index';
import OtpVerification from './../screens/OtpScreen/index';
import RNOtpVerify from 'react-native-otp-verify';





const Stack = createStackNavigator();

const RootNavigator = ({navigation}) => {

  //  RNOtpVerify.getHash()
  //   .then(hash => {
  //     console.log('Use this hash to construct otp message', hash);
  //     console.log('A sample message -');
  //     console.log(`
  //       <#> Dear User,
  //       1091 is your OTP for logging into Ingo-MMT. (Remaining Time: 10 minutes and 0 seconds)
  //        ${hash[0]}
  //     `);
  //   })
  //   .catch(error => console.log(error));

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}> 
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'Signup'} component={SignupScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      {/* <Stack.Screen name={'OtpVerification'} component={OtpVerification} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
