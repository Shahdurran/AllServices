import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'rn-fetch-blob';

const initialState = {
  address: '',
  lat: null,
  long: null,
  latDelta:null,
  longDelta:null,
  loading: false,
  error: '',
};

// const baseUrl = "http://192.168.10.22:8000";

// const fetch2 = async (api, body, token = '') => {
//   try{
//   const res = await fetch(`${baseUrl}${api}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// }catch(err){
//  console.log("this is the error",err)
//  throw err
// }

// }

async function storeUserLongitude(userLat) {
  try {
    console.log('Pre Storage ', userLat);
    const res2 = await AsyncStorage.setItem(
      'userLatitude',
      JSON.stringify(userLat),
    );
  } catch (e) {
    console.log('Storage Failed ', e);
  }
}
async function storeUserLatitude(userLong) {
  try {
    console.log('Pre Storage ', userLong);
    const res = await AsyncStorage.setItem(
      'userLongitude',
      JSON.stringify(userLong),
    );
  } catch (e) {
    console.log('Storage Failed ', e);
  }
}
// const fetch2 = async (api, body, token = '') => { RNFetchBlob.fetch('POST', api, {
//   'Content-Type': 'application/json',
// }, [
//     { body }
//   ]) .then((resp) => {
//     console.log(resp.text());
//   }).catch((err) => {
//     console.log(err);
//   });
// }
// export const signupUser = createAsyncThunk('signupuser', async body => {
//   const result = await fetch2('/signup', body);
//   return result;
// });
// export const signinUser = createAsyncThunk('signinuser', async body => {
//   const result = await fetch2('/signin', body);
//   return result;
// });

const addressReducer = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, {payload: {latitude, longitude}}) => {
      (state.lat = latitude.latitude), (state.long = longitude.longitude);
      // storeUserLatitude(latitude.latitude);
      // storeUserLongitude(longitude.longitude);
    },
    changeLocation: (state, {payload: {region, address}}) => {
      (state.address = address),
        (state.lat = region.latitude),
        (state.long = region.longitude);
        (state.latDelta = region.longitudeDelta);
        (state.longDelta = region.latitudeDelta);
      storeUserLatitude(region.latitude);
      storeUserLongitude(region.longitude);
    },

    // addToken: async (state,action)=>{
    //     state.token = try {
    //         await AsyncStorage.getItem('userToken');
    // }
    // catch (e) {
    //   console.log(e);
    // }
    // }
  },
  /*for async actions we need to create its reducers in extra reducers  */
  extraReducers: {
    // [signupUser.fulfilled]: (state, {payload: {error, message}}) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //   } else {
    //     console.log(state);
    //     state.error = message;
    //   }
    // },
    // [signupUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signinUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signinUser.fulfilled]: (state, {payload: {error, message, token}}) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //   } else {
    //     state.token = token;
    //     storeUserId(token);
    //   }
    // },
  },
});

export const {addAddress, changeLocation} = addressReducer.actions;
export default addressReducer.reducer;
