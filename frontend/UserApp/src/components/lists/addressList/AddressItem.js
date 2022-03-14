import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import {windowWidth, windowHeight} from '../../../utils/index';
import {RadioButton} from 'react-native-paper';

export const AddressItem = ({item}) => {
     const [checked, setChecked] = React.useState(false);

     

  return (
    <TouchableOpacity  onPress={() => setChecked(!checked)}>
      <View style={styles.cardView}>
        <View style={styles.textView}>
          <RadioButton
            color="#E60023"
            value={item.id}
            status={checked? 'checked' : 'unchecked'}
          />
          <View>
            <Text style={styles.itemTitle}>{item.address}</Text>
            <Text style={[styles.itemTitle,{fontWeight:"normal",fontSize:14}]}>{item.city}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: windowWidth,
    paddingVertical: 3,
    backgroundColor:"white",

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
    postion: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    margin: 10,
    left: 5,
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
    marginLeft:10,
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
