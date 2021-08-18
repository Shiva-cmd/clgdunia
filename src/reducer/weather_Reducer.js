/* eslint-disable prettier/prettier */
import {
    WEATHER_API_SUCCESS,
    WEATHER_API_FAIL,
} from '../constants/constants';

export const weatherApi_reducer = (
    state = {
        loading: true,
        weatherApi: '',
        success: false,
        error: false,
    },
    action,
) => {
    switch (action.type) {
        case WEATHER_API_SUCCESS: {
            return {
                loading: false,
                weatherApi: action.payload,
                success: true,
                error: false,
            };
        }
        case WEATHER_API_FAIL: {
            return {
                loading: false,
                weatherApi: action.payload,
                success: false,
                error: true,
            };
        }
        default:
            return {
                loading: true,
                weatherApi: '',
                success: false,
                error: false,
            };
    }
};
