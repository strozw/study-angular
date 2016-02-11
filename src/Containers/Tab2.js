import app from '../app';
import BasePageController from './BasePageController';
import lodash from 'lodash';
import { defaultState } from '../Reducers/Tab2';

export const ActionTypes = {
  REQUEST_DATA: 'TAB2:REQUEST_DATA',
  RECEIVE_DATA: 'TAB2:RECEIVE_DATA',
};

export function Tab2ActionsService($http) {
  'ngInject';

  function fetchData(cb) {
    return (dispatch, getState) => {
      dispatch({ type: ActionTypes.REQUEST_DATA });

      return $http.get(`http://www.reddit.com/r/vuejs.json`)
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

app.service('Tab2Actions', Tab2ActionsService);


export default class Tab2Controller extends BasePageController {
 /**
   * @ngInject
  */
  constructor(Tab2Actions, $ngRedux, $scope) {
    super(Tab2Actions, $ngRedux, $scope);

    this.fetchData(() => {
      $scope.$apply();
    });
  }

  get stateName() {
    return 'tab2';
  }

  get defaultState() {
    return defaultState;
  }

  get lazyRepeatOption() {
    console.log('lazy!!!');
    return {
      countItems: () => {
        const children = lodash.get(this, 'pageData.data.children');
        return children.length;
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

app.controller('Tab2Controller', Tab2Controller);
