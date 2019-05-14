
import type { Action } from './types';


export const UPDATE_USER_ID = 'UPDATE_USER_ID';
export const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR';


export function updateUserId(id_person):Action {
  return {
    type: UPDATE_USER_ID,
    id_person
  };
}

export function updateUserAvatar(user_avatar):Action {
  return {
    type: UPDATE_USER_AVATAR,
    user_avatar
  };
}
