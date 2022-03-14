import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Search from './../../screens/Users/SearchScreen/index';
import {useDispatch} from 'react-redux';
import {searchProviderCategory} from './../../redux/reducers/providerReducer';
import { useSelector } from 'react-redux';

const ServiceBtn = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const searchProvider = () => {
    const provider = props.serviceProvider; 
    dispatch(searchProviderCategory({provider}));
    navigation.navigate('Search', {category: props.serviceProvider});
  };
  return (
    <View>
      <TouchableOpacity style={styles.srvBtn} onPress={() => searchProvider()}>
        <Image style={{width: 50, height: 50}} source={props.ImgSource} />
        <Text style={{color: '#000', fontWeight: '500'}}>
          {props.serviceProvider}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceBtn;

const styles = StyleSheet.create({
  srvBtn: {
    width: 85,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#cdcdcd',
  },
});
