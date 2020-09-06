import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers';
import persist from './reducers/persist';

const persistedReducer = persist('root',[],rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
