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
import { useNavigation } from '@react-navigation/native';
import {popularSP} from './../../../assets/data/carouselData';


export const ServiceCard = ({item, name}) => {
  var jugaar = popularSP ;
  console.log(jugaar);
  const navigation = useNavigation();

  if (name == 'Horizontal List') {
    
    return (
      <TouchableOpacity style={styles.touchableStyle} onPress={()=>navigation.navigate("Order",{data: item,category:"local"})}>
        <View style={styles.cardView}>
          <ImageBackground
            style={styles.image}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: '#000',
            }}
            source={item.url}>
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholder}>Celebration Deals</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.textView}>
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={[styles.itemDescription, {color: 'gray'}]}>
              {item.cost} - {item.category}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon2 name="delivery-dining" color="gray" size={17} />
              <Text style={[styles.itemDescription, {color: 'gray'}]}>
                - Rs {item.visitcharges}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.itemRating}>
              <Icon name="star" color="#FF9529" /> {item.rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {

    return (
      <TouchableOpacity style={[styles.touchableStyle,{width:windowWidth-30}]} onPress={()=>navigation.navigate("Order",{data: item,category:"server"})}>
        <View style={[styles.cardView ,{width:windowWidth-30}]}>
          <ImageBackground
            style={styles.image}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: '#000',
            }}
            source={item.url}>
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholder}>Celebration Deals</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.textView}>
          <View>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={[styles.itemDescription, {color: 'gray'}]}>
              {item.cost} - {item.category}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon2 name="delivery-dining" color="gray" size={17} />
              <Text style={[styles.itemDescription, {color: 'gray'}]}>
                - Rs {item.price}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.itemRating}>
              <Icon name="star" color="#FF9529" /> {item.ratings}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  touchableStyle: {
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: windowWidth - 160,
  },
  cardView: {
    width: windowWidth - 160,
    height: windowHeight / 6.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    // shadowOffset: {width: 0.5, height: 0.5},
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 5,
  },
  placeholderContainer: {
    width: '50%',
    backgroundColor: '#e71e26',
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    marginVertical: 10,
  },
  placeholder: {
    marginHorizontal: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  header1: {
    flex: 1,
    zIndex: -1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textView: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 5,
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
  itemDescription: {
    color: 'black',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
