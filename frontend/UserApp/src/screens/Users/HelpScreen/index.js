import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import HelpList from './../../../components/lists/helpList/index';

const UserHelp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>How can we help?</Text>
      </View>
      <View style={styles.listContainer}>
        <HelpList
          icon1="wrench"
          icon2="chevron-right"
          title="Get help with my orders"
        />
        <HelpList
          icon1="envelope"
          icon2="chevron-right"
          title="My support requests"
        />
        <HelpList
          icon1="user-circle"
          icon2="chevron-right"
          title="My Account"
        />
        <HelpList icon1="credit-card" icon2="chevron-right" title="Payment" />
        <TouchableOpacity style={styles.itemContainer}>
          <Icon name="medkit-outline" size={25} color="black" />
          <Text style={styles.title}>Safety Concerns</Text>
          <Icon2 name="chevron-right" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Icon name="pricetag-outline" size={25} color="black" />
          <Text style={styles.title}>Vouchers</Text>
          <Icon2 name="chevron-right" size={25} color="red" />
        </TouchableOpacity>
        <HelpList icon1="ellipsis-h" icon2="chevron-right" title="FAQ" />
      </View>
    </View>
  );
};

export default UserHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.15,
  },
  headertxt: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
    color: 'red',
  },
  listContainer: {
    flex: 0.9,
  },
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
