import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CovidMessage from './../../../components/CovidMessage/index';
import HomeSearch from './../../../components/HomeSearch/index';
import CustomTextInput from './../../../assets/lib/CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ProviderList from './../../../components/lists/providerList/index';
import {CustomText} from './../../../assets/lib';
import {popularSP} from './../../../assets/data/carouselData';
import {useSelector} from 'react-redux';

const Search = ({route}) => {
  const [searchResults, setResults] = useState(false);

    const {category} = route.params;
  
  console.log(data);
  const data = useSelector(state => state.search.categorySearchresult);
  useEffect(() => {
    setResults(true);
  }, [data]);

  const searchData = () => {};

  if (data != null && searchResults != false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom: 10, marginHorizontal: 10}}>
          <CustomTextInput
            containerStyle={{
              backgroundColor: 'white',
              borderRadius: 8,
              marginTop: 10,
            }}
            placeholder={'Search for service providers'}
            selectionColor={'black'}
            // style={{backgroundColor: 'white', color: 'red'}}
            onChangeText={() => searchData()}
            LeftComponent={
              <Icon
                name="search"
                size={23}
                style={{paddingRight: 10}}
                color="rgba(0,0,0,0.8)"></Icon>
            }
            RightComponent={
              <TouchableOpacity>
                <Icon2
                  name="filter"
                  size={22}
                  color="#E60023"
                  style={{paddingRight: 10, paddingTop: 3}}></Icon2>
              </TouchableOpacity>
            }
          />
          {/* <HomeMap /> */}
        </View>

        {category !="notSearch" ? (
          <ScrollView style={{marginLeft: 10}}>
            <View style={{marginVertical: 10}}>
              <ProviderList
                data={data}
                name="HomeProviderList"
                title="Search Results"
              />
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={{marginLeft: 10}}>
            <View style={{marginVertical: 10}}>
              <ProviderList
                data={popularSP}
                name="HomeProviderList"
                title="Your service providers"
              />
            </View>
            <View style={{marginVertical: 10}}>
              <ProviderList
                data={popularSP}
                name="HomeProviderList"
                title="All Service Picks"
              />
            </View>
            <View style={{marginVertical: 10}}>
              <ProviderList
                data={popularSP}
                name="HomeProviderList"
                title="Your service providers"
              />
            </View>
            <View style={{marginVertical: 10}}>
              <ProviderList
                data={popularSP}
                name="HomeProviderList"
                title="All Service Providers"
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
});
