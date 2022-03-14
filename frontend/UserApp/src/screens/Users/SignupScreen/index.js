import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
// import {AuthContext} from '../navigation/AuthProvider';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormButton from '../../../assets/lib/FormButton';
import FormInput from '../../../assets/lib/FormInput';
import SocialButton from '../../../assets/lib/SocialButton';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from './../../../redux/reducers/authReducer';
import {windowWidth} from './../../../utils/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

const SignupScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.user);

  const authenticate = () => {
    dispatch(
      signupUser({
        name: data.username,
        email: data.email,
        phoneNo: data.mobile,
        password: data.password,
      }),
    );
    if (error == 'please add all the fields') {
      alert(error);
    } else {
      navigation.navigate('Login');
    }
  };

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const handleEmailChange = val => {
    setData({
      ...data,
      email: val,
    });
  };
  const handleMobileChange = val => {
    setData({
      ...data,
      mobile: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* {error &&
        // Alert.alert({error});
        console.log("hello",error)
      } */}
      <Text style={styles.text}>Let's Create Your Account!</Text>
      <FormInput
        labelValue={data.username}
        onChangeText={val => textInputChange(val)}
        placeholderText="Enter your full name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{flexDirection: 'row'}}>
        <FormInput
          placeholder="Your Password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={val => handlePasswordChange(val)}
          iconType="lock"
        />
        <TouchableOpacity
          style={{position: 'absolute', left: 330, top: 17}}
          onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="#000" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <FormInput
          placeholder="Confirm Your Password"
          secureTextEntry={data.confirm_secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          iconType="lock"
          onChangeText={val => handleConfirmPasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updateConfirmSecureTextEntry}
          style={{position: 'absolute', left: 330, top: 17}}>
          {data.confirm_secureTextEntry ? (
            <Feather name="eye-off" color="#000" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <FormInput
        labelValue={data.email}
        onChangeText={val => handleEmailChange(val)}
        placeholderText="Enter your email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={data.mobile}
        onChangeText={val => handleMobileChange(val)}
        placeholderText="Enter Mobile No."
        iconType="phone"
        length={11}
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View>
        <FormButton buttonTitle="Sign Up" onPress={() => authenticate()} />
      </View>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },

  navButton: {
    marginTop: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    textAlign: 'center',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 25,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
});
