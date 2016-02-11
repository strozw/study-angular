import {
  stateGo,
  stateReload,
  stateTransitionTo,
} from 'redux-ui-router';

export default class BasePageController {
 /**
  * [constructor description]
  * @param  {Store} $ngRedux [description]
  * @param  {[type]} $scope   [description]
  * @param  {[type]} $state   [description]
  * @return {[type]}          [description]
   * @ngInject
  */
  constructor(actions, $ngRedux, $scope) {
    this._unsub = $ngRedux.connect(
      this.mapState.bind(this),
      this.createMapActions(actions)
    )(this.mapTarget);

    $scope.$on('$destroy', (event) => {
      this.onDestroy(event);
    });
  }

  get stateName() {
    return '';
  }

  get defaultState() {
    return {};
  }

  get mapTarget() {
    return this;
  }

  mapState(state) {
    const mapState = {
      pageData: state[this.stateName] || this.defaultState
    };
    return mapState;
  }

  createMapActions(actions) {
    const mapActions = Object.assign(
      {
        stateGo,
        stateReload,
        stateTransitionTo,
      },
      actions
    );

    return mapActions;
  }

  onDestroy(event) {
    this._unsub();
  }
}
