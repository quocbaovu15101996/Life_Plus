import {combineReducers} from 'redux';
import location from './location';
import markers from './listMarker';

export default combineReducers({
  location,
  markers
});