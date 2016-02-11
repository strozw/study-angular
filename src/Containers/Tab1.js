import app from '../app';
import BasePageController from './BasePageController';
import lodash from 'lodash';
import { defaultState } from '../Reducers/Tab1';

export const ActionTypes = {
  REQUEST_DATA: 'TAB1:REQUEST_DATA',
  RECEIVE_DATA: 'TAB1:RECEIVE_DATA',
};

/**
 * [Tab1ActionsService description]
 * @param {[type]} $http [description]
 * @return {Tab1Actions}
 */
export function Tab1ActionsService($http) {
  'ngInject';

  function fetchData() {
    return (dispatch, getState) => {
      dispatch({ type: ActionTypes.REQUEST_DATA });

      return $http.get(`http://www.reddit.com/r/angular.json`)
        .then(response => response.data)
        .then((json) => {
          dispatch({ type: ActionTypes.RECEIVE_DATA, data: json.data });
        });
    };
  }

  return {
    fetchData,
  };
}

app.service('Tab1Actions', Tab1ActionsService);


/**
 * @mixin
 */
export default class Tab1Controller extends BasePageController {
 /**
   * @ngInject
  */
  constructor(Tab1Actions, $ngRedux, $scope) {
    super(Tab1Actions, $ngRedux, $scope);
    this.name = 'Tab1!!!!!!';

    this.fetchData();
  }

  get stateName() {
    return 'tab1';
  }

  get defaultState() {
    return {};
  }

  get lazyRepeatOption() {
    console.log('lazy!!!');
    return {
      countItems: () => {
        const children = lodash.get(this, 'pageData.data.children');
        return children ? children.length : 0;
      },

      calculateItemHeight: (index) => {
        return 45;
      },

      configureItemScope: (index, itemScope) => {
        itemScope.item = lodash.get(this, `pageData.data.children[${index}`);
      },

      destroyItemScope: (index, itemScope) => {
      }
    };
  }
}

app.controller('Tab1Controller', Tab1Controller);
