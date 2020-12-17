import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    blacklist: [],
}
const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [thunk];
// if (__DEV__) {
    middleware.push(logger);
// }

const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
);
let persistor = persistStore(store)

export { store, persistor };
  
 