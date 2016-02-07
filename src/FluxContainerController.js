import FluxStoreGroup from 'flux/lib/FluxStoreGroup';

export default class FluxContainerController {

  constructor($scope) {
    this.onDestroy.bind(this);
    $scope.$on('$destroy', this.onDestroy);

    this.state = this.calculateState(null);

    const stores = this.getStores();

    // This tracks when any store has changed and we may need to update.
    let changed = false;
    const setChanged = () => {changed = true;};

    // This adds subscriptions to stores. When a store changes all we do is
    // set changed to true.
    this._fluxContainerSubscriptions = stores.map(
      store => store.addListener(setChanged)
    );

    // This callback is called after the dispatch of the relevant stores. If
    // any have reported a change we update the state, then reset changed.
    const callback = () => {
      if (changed) {
        this.state = this.calculateState(this.state);
      }
      changed = false;
    };

    this._fluxContainerStoreGroup = new FluxStoreGroup(stores, callback);
  }

  onDestroy() {
    this._fluxContainerStoreGroup.release();
    for (const subscription of this._fluxContainerSubscriptions) {
      subscription.remove();
    }
    this._fluxContainerSubscriptions = [];
  }

  getStores() {
    return [];
  }

  calculateState(prevState) {
    return {};
  }
}
