import { UPDATE_MARKERS_SEARCH } from '../actions/listMarkerSearch';

const initialState = {
  listMarkers: []
};

export default function (state = initialState, action) {
  if (action.type === UPDATE_MARKERS_SEARCH) {
      // alert(JSON.stringify(action.markers))
    return {
      ...state,
      listMarkers: action.listMarkers,
    };
  }

  return state;
}
