import { UPDATE_MARKERS } from '../actions/listMarker';

const initialState = {
  markers: []
};

export default function (state = initialState, action) {
  if (action.type === UPDATE_MARKERS) {
    //   alert(JSON.stringify(action.markers))
    return {
      ...state,
      markers: action.markers,
    };
  }

  return state;
}
