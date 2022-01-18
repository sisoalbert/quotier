import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import quotesReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  quotesReducer: persistReducer(persistConfig, quotesReducer),
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const appPersist = persistStore(store);

export {store, appPersist};
