import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import AddressList from './../../../components/lists/addressList/index';
import { addresses } from './../../../assets/data/addressData';



const UserAddress = () => {
    return (
        <View>
            <AddressList data={addresses} name="addressChange"/>
        </View>
    )
}

export default UserAddress;


const styles = StyleSheet.create({


});