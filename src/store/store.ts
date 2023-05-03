import rootReducer from '.';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export const devTools = process.env.NODE_ENV !== 'production';
export const middleware = devTools ? [thunk, reduxImmutableStateInvariant()] : [thunk];
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {},

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ...middleware,
        ),
    devTools,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
