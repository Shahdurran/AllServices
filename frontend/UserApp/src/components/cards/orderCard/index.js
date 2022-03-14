import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {windowWidth, windowHeight} from './../../../utils/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export const OrderCard = ({item}) => {
  return (
    <>
      <View style={styles.touchableStyle}>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.cardView}>
              <ImageBackground
                style={styles.image}
                imageStyle={{
                  borderRadius: 10,
                  backgroundColor: '#000',
                }}
                source={item.url}></ImageBackground>
            </View>
            <View style={styles.itemContainer}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text
                  style={[styles.itemTitle, {fontWeight: '400', fontSize: 12}]}>
                  {item.category}
                </Text>
              </View>
              <View>
                <Text style={styles.itemPrice}>Rs. {item.visitcharges}</Text>
              </View>
            </View>
          </View>
          <View style={styles.textView}>
            <View>
              <Text style={[styles.itemDescription, {color: 'gray'}]}>
                {item.date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Change order details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 1,
    backgroundColor: '#fff',
    borderRadius: 10,

    // backgroundColor: 'red',
  },
  cardView: {
    width: windowWidth - 325,
    height: windowHeight / 8.2,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
  },
  textView: {
    // backgroundColor: '#fff',
    width: windowWidth - 325,

    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    height: '100%',
  },
  btn: {
    padding: 5,
    backgroundColor: '#e71e26',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  btnContainer: {
    position: 'absolute',
    top: 80,
    left: 200,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    // paddingTop: 5,
  },
  itemTitle: {
    color: 'black',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  itemPrice: {
    color: 'black',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: 'black',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    textAlign: 'center',
  },
});
