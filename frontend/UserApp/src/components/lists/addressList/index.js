import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {windowWidth, windowHeight} from '../../../utils/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { AddressItem } from './AddressItem';
import { useNavigation } from '@react-navigation/native';





const AddressList = props => {

  const navigation = useNavigation();
  
  return (
    <>
      <View style={{height: windowHeight}}>
        <View style={styles.cardView}>
          <TouchableOpacity>
            <View style={styles.textView}>
              <Icon name="navigate-outline" color="#E60023" size={22} />
              <View>
                <Text style={styles.itemTitle}>Use my current location</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      <View style={{flex:1,paddingBottom:50}}>
        <FlatList
          data={props.data}
          keyExtractor={(item, index) => 'key' + index}
          vertical
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          showsVeritcalScrollIndicator={true}
          renderItem={({item}) => {
            return <AddressItem item={item} />;
          }}
        />
        </View>

        <View style={styles.cardView2}>
          <TouchableOpacity onPress={()=>navigation.navigate("AddressChangeMap")}>
            <View style={styles.textView}>
              <Icon name="add-outline" color="#E60023" size={22} />
              <View>
                <Text style={styles.itemTitle}>Add a new address</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  currentStyle1: {
    flexDirection: 'row',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentStyle2: {
    flexDirection: 'row',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textView: {
    postion: 'absolute',
    flexDirection: 'row',
    margin: 10,
    left: 5,
  },
  itemTitle: {
    color: '#E60023',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  cardView: {
    width: windowWidth,
    paddingTop: 10,
    // marginBottom:10,
    paddingLeft:8,
    // justifyContent:"center",
    // marginHorizontal: 10,
    backgroundColor:"white"
  },
  cardView2: {
    position:"absolute",
    bottom:80,
    left:0,
    right:0,
    width: windowWidth,
    paddingTop: 3,
    paddingLeft:8,
    backgroundColor:"white",
    // marginHorizontal: 10,
  },
});
