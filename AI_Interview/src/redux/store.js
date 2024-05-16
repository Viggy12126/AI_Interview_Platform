import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer.js';

const store = configureStore({
    reducer: {
      user: userReducer,
    //   profile: profileReducer,
    //   course: courseReducer,
    //   subscription: subscriptionReducer,
    //   admin: adminReducer,
    //   other: otherReducer,
    },
  });

  export default store;