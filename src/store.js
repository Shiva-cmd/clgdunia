/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {createStore, combineReducers} from 'redux';
import {weatherApi_reducer} from './reducer/weather_Reducer';
import thunk from "redux-thunk";
import {applyMiddleware} from 'redux';




const reducer = combineReducers({
  weather: weatherApi_reducer,
});

const initialState = {
  weather: {
    weatherApi: '',
  },
};
const middleware = [thunk];


const store = createStore(reducer, initialState,  applyMiddleware(...middleware),

);
export default store;
