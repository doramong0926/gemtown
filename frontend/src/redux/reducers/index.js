
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { i18nState } from "redux-i18n";
import UserReducer from "./userReducer";
import ModelReducer from "./modelReducer";
import SpinnerReducer from "./spinnerReducer";
import MusicReducer from './musicReducer';
import MusicPlayerReducer from './musicPlayerReducer';
import GemReducer from './gemReducer';
import AdvertisingResucer from './advertisingResucer';

export default (history) => combineReducers({
    user: UserReducer,
    music: MusicReducer,
    model: ModelReducer,
    spinner: SpinnerReducer,
    musicPlayer: MusicPlayerReducer,
    gem: GemReducer,
    advertising: AdvertisingResucer,
    router: connectRouter(history), //router name should not be changed
    i18nState,
});
