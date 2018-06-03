import {UPDATE_USER} from './user-action';

export default function userReducer(state = 'init user', action) {
    console.log(state,action,'state');
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
}
