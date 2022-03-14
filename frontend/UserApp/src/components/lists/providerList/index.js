import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {ServiceCard} from '../../cards/serviceCard';
import CustomText from '../../../assets/lib/CustomText';


const ProviderList = props => {
  const [dataList, setDataList] = useState(props.data);
  useEffect(() => {
    setDataList(props.data);
  },[]);
  if (props.name == 'HomeProviderList') {
    if (props.data && props.data.length) {
      if (
        props.title != 'All Service Providers' &&
        props.title != 'Search Results'
      ) {
        return (
          <SafeAreaView>
            <CustomText style={{fontSize: 18, fontWeight: 'bold'}}>
              {props.title}
            </CustomText>
            <FlatList
              data={dataList}
              keyExtractor={(item, index) => 'key' + index}
              horizontal
              pagingEnabled
              scrollEnabled
              snapToAlignment="center"
              initialNumToRender="2"
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return <ServiceCard item={item} name="Horizontal List" />;
              }}
            />
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView>
            <CustomText style={{fontSize: 18, fontWeight: 'bold'}}>
              {dataList.category}
            </CustomText>
            <FlatList
              data={dataList}
              keyExtractor={(item, index) => 'key' + index}
              vertical
              pagingEnabled
              scrollEnabled
              snapToAlignment="center"
              initialNumToRender="2"
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return <ServiceCard item={item} name="Vertical List" />;
              }}
              
            />
          </SafeAreaView>
        );
      }
    }
  }
};

export default ProviderList;

const styles = StyleSheet.create({});
