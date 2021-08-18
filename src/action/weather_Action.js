/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { WEATHER_API_FAIL, WEATHER_API_SUCCESS } from "../constants/constants";
import axios from "axios";




export const weather_API = (lat, lon) => async (dispatch) => {
    // 5cdc7fd769e091b4366f45aed6a67caa    
    // bb54f67a905fbcdf068b2256172ef92e

    var config = {
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=5cdc7fd769e091b4366f45aed6a67caa`,
    };
    await axios(config)
        .then(function (response) {
            dispatch({
                type: WEATHER_API_SUCCESS,
                payload: response.data,
            });
        })
        .catch(function (error) {
            dispatch({
                type: WEATHER_API_FAIL,
                payload: error,
            });
        });

};
