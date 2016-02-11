import app from '../app';
import * as Helper from '../Helpers/OnsUiRoutingHelper.js';

/**
 * [config description]
 * @param  {[type]} function ($stateProvider, $urlRouterProvider [description]
 * @return {[type]}          [description]
 * @ngInject
 */
export function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/tab1');

  $stateProvider
    .state('mainTabbar', {
      abstract: true,
      onEnter: ($rootScope) => {
        'ngInject';
        Helper.changeTabbarPage($rootScope, 'mainNavi', 'html/mainTabbar.html');
      },
    })
      .state('tab1', {
        parent: 'mainTabbar',
        url: '/tab1',
        page: 'html/tab1.html',
        tabbarName: 'mainTabbar',
        tabIndex: 0,
        onEnter: ($rootScope, $ngRedux) => {
          'ngInject';
          console.log('Tab1!!!');
          Helper.changeTab($rootScope, $rootScope.toState, $rootScope.fromState);
        },
      })
      .state('tab2', {
        parent: 'mainTabbar',
        url: '/tab2',
        page: 'html/tab2.html',
        tabbarName: 'mainTabbar',
        tabIndex: 1,
        onEnter: ($rootScope, $ngRedux) => {
          'ngInject';
          console.log('Tab2!!!');
          Helper.changeTab($rootScope, $rootScope.toState, $rootScope.fromState);
        },
      })
      .state('detail', {
        url: '/detail/:index',
        onEnter: ($rootScope, $stateParams) => {
          'ngInject';
          $rootScope.mainNavi.pushPage('html/detail.html', { 'index': $stateParams.index });
        },
        onExit: ($rootScope) => {
          'ngInject';
          $rootScope.mainNavi.popPage();
        },
      })
    ;
}

/**
 * @ngInject
 */
export function routerRun($ngRedux, $rootScope, $urlRouter, $state) {
  var check = 1;

  $rootScope.$on(
		'$stateChangeStart',
    (e, to, toParam, from, fromParam) => {
      $rootScope.toState = to;
      console.log($ngRedux.getState().router);

      return true;
    }
  );

  $urlRouter.sync();
  $urlRouter.listen();
}

app.config(routerConfig);
app.run(routerRun);
