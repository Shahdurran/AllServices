import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import CustomText from '../../../assets/lib/CustomText';
import { OrderCard } from '../../cards/orderCard';

const OrderList = props => {
  const [dataList, setDataList] = useState(props.data);

  useEffect(() => {
    setDataList(props.data);
  });
  if (props.name == 'OrderList') {
    if (props.data && props.data.length) {
      return (
        <View>
          <CustomText style={{fontSize: 17, fontWeight: 'bold',marginHorizontal:10,marginVertical:10}}>
            {props.title}
          </CustomText>
          <FlatList
            data={props.data}
            keyExtractor={(item, index) => 'key' + index}
            vertical
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            initialNumToRender="2"
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <OrderCard item={item} />;
            }}
          />
        </View>
      );
    }
  }
};

export default OrderList;

const styles = StyleSheet.create({});
