import { UPDATE_LOCATION } from '../actions/location';

const initialState = {
  location: {
    latitude:21.159187,
    longitude:106.064988
  },
};

export default function (state = initialState, action){
  if (action.type === UPDATE_LOCATION) {
    return {
      ...state,
      location:action.location,
    };
  }

  return state;
}
