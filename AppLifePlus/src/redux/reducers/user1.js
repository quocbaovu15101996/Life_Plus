
import type { Action } from '../actions/types';
import { UPDATE_USER_ID, UPDATE_USER_AVATAR} from '../actions/user1';

export type State = {
  id_person: 0,
    avatar:""
}

const initialState = {
  id_person:0,
  avatar:""
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === UPDATE_USER_ID) {
    return {
      ...state,
      id_person:action.id_person,
    };
  }

  if (action.type === UPDATE_USER_AVATAR) {
    return {
      ...state,
      avatar:action.user_avatar,
    };
  }
  
  return state;
}
