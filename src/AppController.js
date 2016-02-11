import app from './app';

export default class AppController {
    /**
     * @param  {ngReduxProvider} $ngRedux [description]
     * @param  {[type]} $scope   [description]
     * @return {[type]}          [description]
     * @ngInject
     */
    constructor($ngRedux, $scope) {
      //$ngRedux.connect(this.mapToState);
    }

}

app.controller('AppController', AppController);
