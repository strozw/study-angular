/* global angular :true */
import es6Promise from 'es6-promise';
import 'angular';
import 'angular-ui-router';
import AppController from './AppController';

es6Promise.polyfill();

const app = angular.module(
  'myApp', ['ui.router']
);

app.controller('AppController', AppController);
