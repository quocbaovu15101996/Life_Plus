import {combineReducers} from 'redux';
import location from './location';
import markers from './listMarker';
import listMarkers from './listMarkerSearch';
export default combineReducers({
  location,
  markers,
  listMarkers
});