import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {removeToken} from '../redux/reducers/authReducer';

// import {AuthContext} from './../components/context/AuthContext';
import UserHomeScreen from './../screens/Users/HomeScreen/index';
import { useDispatch } from 'react-redux';

const DrawerContent = props => {
  // const {signOut} = React.useContext(AuthContext);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            borderBottomWidth: 1,
          }}>
          <Image
            style={{width: 40, height: 60}}
            source={require('../assets/AllServicesmall.png')}
          />
          <Text style={{color: '#000', paddingTop: 20, fontSize: 18}}>
            All Service
          </Text>
        </TouchableOpacity>
      </Drawer.Section>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Icon name="receipt-outline" color="#e71e26" size={26} />
              )}
              label="Orders"
              onPress={() => {
                props.navigation.navigate('Orders');
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="location-outline" color="#e71e26" size={26} />
              )}
              label="Address"
              onPress={() => {
                props.navigation.navigate('Address');
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="pricetag-outline" color="#e71e26" size={26} />
              )}
              label="Vouchers"
              onPress={() => {
                props.navigation.navigate('Vouchers');
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="information-circle-outline"
                  color="#e71e26"
                  size={26}
                />
              )}
              label="Help centre"
              onPress={() => {
                props.navigation.navigate('UserHelp');
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="settings-outline" color="#e71e26" size={26} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('UserSettings');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="log-out-outline" color="#e71e26" size={26} />
          )}
          label="Sign Out"
          onPress={() => {
            dispatch(removeToken());
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
// <Drawer.Navigator
//   activeColor="#fff"
//   screenOptions={{
//     headerShown: false,
//     drawerStyle: {
//       backgroundColor: '#fff',
//       width: 240,
//     },
//     drawerLabelStyle: {
//       color: '#000',
//     },
//   }}>
//   <Drawer.Screen
//     name="Orders"
//     component={UserOrders}
//     options={{
//       drawerLabel: 'Orders',
//       drawerIcon: ({color}) => (
//         <Icon name="receipt-outline" color="#e71e26" size={26} />
//       ),
//     }}
//   />
//   <Drawer.Screen
//     name="Vouchers"
//     component={Vouchers}
//     options={{
//       drawerLabel: 'Vouchers',
//       drawerIcon: ({color}) => (
//         <Icon name="pricetag-outline" color="#e71e26" size={26} />
//       ),
//     }}
//   />

//   <Drawer.Screen
//     name="Help"
//     component={UserHelp}
//     options={{
//       drawerLabel: 'Help centre',
//       drawerIcon: ({color}) => (
//         <Icon name="information-circle-outline" color="#e71e26" size={26} />
//       ),
//     }}
//   />
//   <Drawer.Screen
//     name="Settings"
//     component={UserSettings}
//     options={{
//       drawerLabel: 'Settings',
//       drawerIcon: ({color}) => (
//         <Icon name="settings-outline" color="#e71e26" size={26} />
//       ),
//     }}
//   />
// </Drawer.Navigator>
