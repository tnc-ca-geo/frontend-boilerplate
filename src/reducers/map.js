import { INIT_MAP } from '../actions/map';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_SCENE:
      return action.name || initialState;
    default:
      return state;
  }
}
