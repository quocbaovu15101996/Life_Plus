import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import list from "./list";
import user1 from "./user1";
export default combineReducers({
  form: formReducer,
  user,
  list,
  user1
});
