import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import FormInput from './../../components/FormInput';
import FormButton from './../../components/FormButton';
import SocialButton from './../../components/SocialButton';
// import {AuthContext} from '../navigation/AuthProvider';

const ProviderRegisterScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  //   const {register} = useContext(AuthContext);
   `localhost/8000/register`
  return (

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
          labelValue={name}
          onChangeText={userName => setName(userName)}
          placeholderText="Enter your full name"
          iconType="user"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Enter your email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={mobile}
          onChangeText={userMobile => setMobile(userMobile)}
          placeholderText="Enter Mobile No."
          iconType="phone"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={city}
          onChangeText={userCity => setCity(userCity)}
          placeholderText="City"
          iconType="home"
        />
        <FormInput
          labelValue={area}
          onChangeText={userArea => setArea(userArea)}
          placeholderText="Area"
          keyboardType="default"
          autoCapitalize="none"
          iconType="home"
          autoCorrect={false}
        />
        <FormInput
          labelValue={address}
          onChangeText={userAddress => setAddress(userAddress)}
          placeholderText="Address"
          keyboardType="default"
          iconType="home"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormInput
          labelValue={confirmPassword}
          onChangeText={userPassword => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign Up"
          // onPress={() => register(email, password)}
        />

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

        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
      
    
  );
};

export default ProviderRegisterScreen;

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
});
