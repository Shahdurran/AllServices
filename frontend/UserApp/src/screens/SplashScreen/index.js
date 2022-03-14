import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {windowWidth, windowHeight} from './../../utils/index';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import Carousel from './../../components/carousel/Carousel';
import {bgPics} from './../../assets/data/carouselData';

const Splash = () => {
  const navigation = useNavigation();
  const [toggleFooter, setFooter] = useState(false);
  const image = require('../../assets/work1.jpg');

  const {colors} = useTheme();

  const footerToggle = () => {
    setFooter(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {toggleFooter ? (
        <>
          <View style={styles.header}>
            <Animatable.Image
              animation="fadeIn"
              duraton="1500"
              source={require('../../assets/AllService-log.png')}
              style={styles.logo}
              resizeMode="stretch"
            />
          </View>
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: '#000',
              },
            ]}
            animation="fadeInUpBig">
            <View style={styles.button1}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <LinearGradient
                  colors={['#fff', '#cdcdcd']}
                  style={styles.signIn2}>
                  <Text style={[styles.textSign, {color: '#000'}]}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={[styles.button1, {marginTop: 10}]}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <LinearGradient
                    colors={['#e71e26', '#e71e26']}
                    style={styles.signIn2}>
                    <Text style={styles.textSign}>Sign up</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#cdcdcd',
                borderBottomWidth: 1,
                marginTop: 30,
              }}
            />
            <View style={styles.button1}>
              <TouchableOpacity onPress={() => navigation.navigate('')}>
                <LinearGradient
                  colors={['#fff', '#cdcdcd']}
                  style={styles.signIn2}>
                  <Text style={[styles.textSign, {color: '#000'}]}>
                    Browse as a guest
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </>
      ) : (
        <>
          <Carousel data={bgPics} name="bgPics" />

          <View style={{position:"absolute",width:"100%",top:windowHeight-300}}>
            <Animatable.View
              style={[
                styles.footer,
                {
                  width:"100%",
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
              ]}
              animation="fadeInUpBig">
              <Text
                style={[
                  styles.title,
                  {
                    color: '#fff',
                  },
                ]}>
                Need a hand?
              </Text>
              <Text style={styles.text}>Find service provider near you</Text>
              <View style={styles.button}>
                <TouchableOpacity onPress={() => footerToggle()}>
                  <LinearGradient
                    colors={['#e71e26', '#e71e26']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default Splash;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height:height/2.2,
    backgroundColor: '#e71e26',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button1: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  signIn2: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
