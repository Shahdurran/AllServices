import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CovidMessage from './../../../components/CovidMessage/index';
import HomeSearch from './../../../components/HomeSearch/index';
import CustomTextInput from './../../../assets/lib/CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {CustomText} from './../../../assets/lib';
import {orderHistory} from './../../../assets/data/carouselData';
import OrderList from './../../../components/lists/orderList/index';

const UserOrders = () => {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 5}}>
      <OrderList data={orderHistory} name="OrderList" title="Past Orders" />
    </View>
  );
};

export default UserOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
});
