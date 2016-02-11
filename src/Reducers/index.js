import * as redux from 'redux';
import tab1 from './Tab1.js';
import tab2 from './Tab2.js';
import * as reduxUiRouter from 'redux-ui-router';

console.log(tab1);

function test(state = {}, action) {
  return state;
}

const reducer = redux.combineReducers({
  test,
  tab1,
  tab2,
  router: reduxUiRouter.router,
});

export default reducer;
