import app from '../app';
import BasePageController from './BasePageController';
import lodash from 'lodash';

export default class DetailController extends BasePageController {

  /**
   * [constructor description]
   * @param  {[type]} $ngRedux     [description]
   * @param  {[type]} $scope       [description]
   * @param  {[type]} $stateParams [description]
   * @return {[type]}              [description]
   * @ngInject
   */
  constructor($ngRedux, $scope, $stateParams) {
    super({}, $ngRedux, $scope);
    this.index = $stateParams.index;
    this.pageData = lodash.get($ngRedux.getState(), `tab1.data.children[${this.index}]`);
    console.log(this.data);
  }

}

app.controller('DetailController', DetailController);
