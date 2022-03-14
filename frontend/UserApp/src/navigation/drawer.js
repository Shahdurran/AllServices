import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserOrders from '../screens/Users/OrdersScreen/index';
import Vouchers from '../screens/Users/VouchersScreen/index';
import UserHelp from '../screens/Users/HelpScreen/index';
import UserSettings from '../screens/Users/SettingsScreen/index';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './homeStack';
import DrawerContent from './drawerItem';
import UserHomeScreen from './../screens/Users/HomeScreen/index';
import UserAddress from './../screens/Users/AddressScreen/index';
import { useNavigation } from '@react-navigation/native';



const Drawer = createDrawerNavigator();


const leftHeader = () => {
  
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

const Maindrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Awain"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={UserOrders}
        options={{
          headerLeft: () => leftHeader(),
        }}
      />
      <Drawer.Screen
        name="Address"
        component={UserAddress}
        options={{
          headerLeft: () => leftHeader(),
        }}
      />
      <Drawer.Screen
        name="Vouchers"
        component={Vouchers}
        options={{
          headerLeft: () => leftHeader(),
        }}
      />
      <Drawer.Screen
        name="UserHelp"
        component={UserHelp}
        options={{
          headerLeft: () => leftHeader(),
        }}
      />
      <Drawer.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          headerLeft: () => leftHeader(),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Maindrawer;
