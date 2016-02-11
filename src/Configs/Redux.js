import app from '../app';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../Reducers/';
import * as reduxUiRouter from 'redux-ui-router';

/**
 * @param  {ngReduxProvider} $ngReduxProvider
 * @ngInject
 */
export function reduxConfig($ngReduxProvider) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  $ngReduxProvider.createStoreWith(
    reducer,
    [
      'ngUiRouterMiddleware',
      logger,
      thunk,
    ],
    [window.devToolsExtension()]
  );
}

app.config(reduxConfig);
