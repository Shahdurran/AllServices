import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

// import {AuthContext} from '../navigation/AuthProvider';
import {windowWidth, windowHeight} from '../../utils/index';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../../components/context/AuthContext';
import FormButton from '../../assets/lib/FormButton';
import FormInput from '../../assets/lib/FormInput';
import SocialButton from '../../assets/lib/SocialButton';
import {useDispatch,useSelector} from 'react-redux';
import {signinUser} from '../../redux/reducers/authReducer'



const LoginScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
    // const { signIn } = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length == 20) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length == 20) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (email, password) => {

    // const foundUser = Users.filter(item => {
    //   return email == item.email && password == item.password;
    // });

    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Contact or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }
    dispatch(signinUser({email,password}))

    // if (foundUser.length == 0) {
    //   Alert.alert('Invalid User!', 'Contact or password is incorrect.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    // signIn(foundUser);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/AllService-log.png')}
        style={styles.logo}
      />
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#fff',
          },
        ]}>
        <FormInput
          labelValue={data.email}
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          placeholderText="Enter email address"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Invalid Number.
            </Text>
          </Animatable.View>
        )}

        <FormInput
          labelValue={data.password}
          onChangeText={val => handlePasswordChange(val)}
          autoCapitalize="none"
          placeholderText="Password"
          secureTextEntry={data.secureTextEntry ? true : false}
          iconType="lock"
          secureTextEntry={true}
        />
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <FormButton
          buttonTitle="Sign In"
          onPress={() => loginHandle(data.email,data.password)}
        />
        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.DontButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an account? Create here
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    height: windowHeight,
  },
  logo: {
    height: 220,
    width: 270,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text: {
    fontFamily: '',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  navButton: {
    marginTop: 15,
  },
  DontButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
  forgotButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
