/* global angular :true */
import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import ngReduxRouter from 'redux-ui-router';

const app = angular.module(
  'myApp', ['onsen', uiRouter, ngRedux, ngReduxRouter]
);

export default app;
