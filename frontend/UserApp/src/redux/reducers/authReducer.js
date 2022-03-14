import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'rn-fetch-blob';

const initialState = {
  token: '',
  loading: false,
  error: '',
};

const baseUrl = 'http://10.122.139.158:8000';

const fetch2 = async (api, body, token = '') => {
  try {
    const res = await fetch(`${baseUrl}${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.log('this is the error', err);
    throw err;
  }
};

async function storeUserId(userId) {
  try {
    console.log('Pre Storage ', userId);
    const res = await AsyncStorage.setItem('userId', userId);
  } catch (e) {
    console.log('Storage Failed ', e);
  }
}
const signOut = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (e) {
    console.log('removing Failed ', e);
  }
};


export const signupUser = createAsyncThunk('signupuser', async body => {
  console.log(body);
  const result = await fetch2('/api/v1/user/register', body);
  return result;
});
export const signinUser = createAsyncThunk('signinuser', async body => {
  const result = await fetch2('/api/v1/user/login', body);
  return result;
});

// export const addToken = createAsyncThunk('addtoken', async body => {
//   try {
//     const result = await AsyncStorage.getItem('userToken');
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// });

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addToken: async (state,action)=>{
    //     state.token = try {
    //         await AsyncStorage.getItem('userToken');
    // }
    // catch (e) {
    //   console.log(e);
    // }
    // }
    addToken: (state, {payload: {res}}) => {
      state.token = res;
    },
    removeToken: state => {
      signOut();
      state.token = null;
    },
  },
  /*for async actions we need to create its reducers in extra reducers  */
  extraReducers: {
    [signupUser.fulfilled]: (state, {payload: {error, message}}) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        console.log(state);
        state.error = message;
      }
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, {payload: {error, message, token}}) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.token = token;
        storeUserId(token);
      }
    },
  },
});

export const {addToken, removeToken} = authReducer.actions;
export default authReducer.reducer;
