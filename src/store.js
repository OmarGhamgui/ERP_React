
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger-simple";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import combineReducer from "./JS/reducers"
const persistConfig = {
  key: "User",
  timeout: null,
  storage,
  whitelist: [],
  blacklist: ["changeStateReducer","clientReducer","supplierReducer"]
};
const middleware = [thunkMiddleware];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware, logger)
  // other store enhancers if any
);

const persistedReducers = persistReducer(persistConfig, combineReducer);

const store = createStore(persistedReducers, enhancer);
export default store;
export const persistor = persistStore(store);

