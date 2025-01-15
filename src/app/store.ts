import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import offeringsSlice from "../features/offeringslice";
import paymentSlice from "../features/paymentslice";
import {
  getStorageValue,
  setStorageValue,
  removeStorageValue,
} from "../util/localStorage";

const rootReducer = combineReducers({
  counter: counterReducer, //to be removed once we have more than one reducer
  auth: authReducer,
  offerings:offeringsSlice,
  payment:paymentSlice,
});

interface StorageConfig {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

interface PersistConfig {
  key: string;
  storage: StorageConfig;
  whitelist: string[];
}

const persistConfig: PersistConfig = {
  key: "root",
  storage: {
    getItem: (key: string): Promise<string | null> => Promise.resolve(getStorageValue(key)),
    setItem: (key: string, value: string): Promise<void> =>
      Promise.resolve(setStorageValue({ key, value, expirationInDays: 1 })),
    removeItem: (key: string): Promise<void> => Promise.resolve(removeStorageValue(key)),
  },
  whitelist: ["auth"], //add any reducer you want to be persisted here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
