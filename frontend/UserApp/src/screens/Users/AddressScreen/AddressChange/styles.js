import { StyleSheet } from 'react-native';
import { windowWidth } from './../../../../utils/index';

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    height: "100%",
    width:"100%"
  },
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth:1,
    borderBottomWidth:0.5,
    // marginVertical: 5,
    // marginLeft: 20,
  },

  separator: {
    backgroundColor: '#efefef',
    height: 1,
  },
  listView: {
    position: 'absolute',
      top: 49,
      // left:10,
      zIndex: 1,
          backgroundColor:"#fff"
  },
  autocompleteContainer: {
   width:windowWidth,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,

  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 12,
  },
  locationText: {
    color:"black"
  },
});

export default styles;
