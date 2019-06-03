import { UPDATE_LOCATION } from '../actions/location';

// export type State = {
//   location: {},
// }

const initialState = {
  location: {
    latitude: 21.0227788,
    longitude: 105.8194541
  },
};

export default function (state = initialState, action) {
  if (action.type === UPDATE_LOCATION) {
    return {
      ...state,
      location: action.location,
    };
  }

  return state;
}
