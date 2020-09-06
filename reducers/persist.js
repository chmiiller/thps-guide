import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default (key, whitelist, reducer) => persistReducer({
    key,
    storage: AsyncStorage,
    whitelist,
    version: 1,
}, reducer);
