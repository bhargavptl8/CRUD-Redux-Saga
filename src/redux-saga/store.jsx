import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { infoReducer } from './reducers'
import rootSaga from './sagas'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'infoRoot',
    storage,
}

const persistedReducer = persistReducer(persistConfig, infoReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store