import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import {windowWidth, windowHeight} from './../../utils/index';

export const CarouselItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={item.url} />
      {/* <View style={styles.textView}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View> */}
    </View>
  );
};
export const CarouselbgItem = ({item}) => {
  return (
    <ImageBackground
      source={item.url}
      resizeMode="cover"
      style={styles.header1}
    />
    //   <View style={styles.cardView}>
    //         <Image style={styles.image} source={item.url}/>
    //         {/* <View style={styles.textView}>
    //             <Text style={styles.itemTitle}>{item.title}</Text>
    //             <Text style={styles.itemDescription}>{item.description}</Text>
    //         </View> */}
    //     </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: windowWidth - 20,
    height: windowHeight / 3,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  header1: {
    flex: 1,
    zIndex:-1,
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
    postion: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: windowWidth - 20,
    height: windowHeight / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
