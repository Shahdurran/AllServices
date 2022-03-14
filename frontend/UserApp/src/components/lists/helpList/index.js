import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpList = props => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Icon2 name={props.icon1} size={25} color="black" />
      <Text style={styles.title}>{props.title}</Text>
      <Icon2 name={props.icon2} size={25} color="red" />
    </TouchableOpacity>
  );
};

export default HelpList;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  title: {
    flex: 0.8,
    fontSize: 16,
    color: 'black',
  },
});
