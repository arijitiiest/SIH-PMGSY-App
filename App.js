import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import roadsReducer from "./store/reducers/road";
import RoadNavigation from "./navigation/RoadNavigator";

const rootReducer = combineReducers({
  auth: authReducer,
  road: roadsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <RoadNavigation />
    </Provider>
  );
}