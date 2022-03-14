import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import addressReducer from './reducers/addressReducer';
import providerReducer from './reducers/providerReducer';


export const AllServiceStore = configureStore({
  reducer: {
    user: authReducer,
    address: addressReducer,
    search: providerReducer
  },
});
//const composeEnhancers = composeWithDevTools(options);
// const rootReducer = combineReducers({

// });

// export const AllServiceStore = configureStore({
//   reducer: {
//     user: authReducer,
//   },
//   devtools: true,
// });
