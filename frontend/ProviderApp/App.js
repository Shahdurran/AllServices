/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const baseUrl = 'http://192.168.10.9:8000';
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState();
  const fetch2 = async api => {
    try {
      const res = await fetch(`${baseUrl}${api}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
      
    } catch (err) {
      console.log('this is the error', err);
      setCounter(counter + 1);
      throw err;
    }
  };
  useEffect(() => {
    if (counter != 0 && data == null) {
      setInterval(fetch2, 2000);
      // setData(fetch2());
    }
    else{
      // setData(fetch2());
    }
  }, [counter]);
  return (
    <SafeAreaView>
      {counter != 0 ? (
        <View>
          <Text>No order</Text>
        </View>
      ) : (
        <View>
          <Text>Order recieved</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
