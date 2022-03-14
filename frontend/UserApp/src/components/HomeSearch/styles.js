import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#e7e7e7',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#434343',
    padding: 10
  },
  timeContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    padding: 10,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  row:{
      flexDirection: 'row',
      padding: 20,
      alignItems:'center',
      borderBottomWidth:1,
      borderColor: '#dbdbdb'
  },
  iconContainer:{
      backgroundColor: '#b3b3b3',
      padding:10,
      borderRadius:25
  },
  destinationText:{
      marginLeft:10,
      fontWeight:'500',
      fontSize:16,
  }
});

export default styles;