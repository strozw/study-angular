import { ActionTypes } from '../Containers/Tab2';

export const defaultState = {
  isLoading: false,
  data: {},
};

export default function tab1(
  state = defaultState,
  action
) {
  switch (action.type) {
    case ActionTypes.REQUEST_DATA:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ActionTypes.FETCH_DATA:
      return Object.assign({}, state, {
      });
    case ActionTypes.RECEIVE_DATA:
      return Object.assign({}, state, {
        isLoading: true,
        data: action.data,
      });
    default:
      return state;
  }
}
