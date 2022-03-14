// import React from 'react';
// import {View,Image,Text} from 'react-native';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import Icon from 'react-native-vector-icons/Ionicons';
// import UserHomeScreen from './../screens/Users/HomeScreen/index';
// import Search from './../screens/Users/SearchScreen/index';
// import Details from './../screens/Users/DetailsScreen/index';
// import Profile from './../screens/Users/ProfileScreen/index';


// const HomeStack = createStackNavigator();
// const DetailsStack = createStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

//   const LogoTitle = () => {
//     return (
//       <View style={{width: 90, height: 63, flexDirection: 'row', marginLeft:-15 }}>
//         <Image
//           style={{width: 35, height: 60}}
//           source={require('../assets/AllServicesmall.png')}
//         />
//         <Text style={{color: '#000', paddingTop: 20, fontSize: 18}}>
//          All Service
//         </Text>
//       </View>
//     );
//   };
// const TabScreen = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       activeColor="#fff"
//       barStyle={{backgroundColor: '#000'}}>
//       <Tab.Screen
//         name="Feed"
//         component={HomeStackScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({color}) => (
//             <Icon name="ios-home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={Search}
//         options={{
//           tabBarLabel: 'Search',
//           tabBarIcon: ({color}) => (
//             <Icon name="ios-search" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Details}
//         options={{
//           tabBarLabel: 'Notifications',
//           tabBarIcon: ({color}) => (
//             <Icon name="ios-notifications" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({color}) => (
//             <Icon name="ios-person" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabScreen;

// const HomeStackScreen = ({navigation}) => (
// <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#fff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold'
//         }
//     }}>
//         <HomeStack.Screen name="Home" component={UserHomeScreen} options={{
//         headerTitle: props => <LogoTitle {...props} />,
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} color="#000" backgroundColor="#fff" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
// </HomeStack.Navigator>
// );

// const DetailsStackScreen = ({navigation}) => (
// <DetailsStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#cfcfcf',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold'
//         }
//     }}>
//         <DetailsStack.Screen name="Details" component={Details} options={{
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} backgroundColor="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
// </DetailsStack.Navigator>
// );
  