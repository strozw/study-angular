export function changeTabbarPage(scope, naviName, page) {
  const navi = scope[naviName];
  const currentPage = navi.getCurrentPage();

  if (
    !currentPage ||
    (currentPage.page !== page)
  ) {
    navi.resetToPage(page);
  }
}

export function setActiveTabByState(tabbar, toState = {}, fromState = {}) {
  console.log(toState, fromState);
  if (
      (
        (fromState.tabbarName !== toState.tabbarName) &&
        (tabbar.getActiveTabIndex() !== toState.tabIndex)
      ) ||
      (
        (fromState.tabbarName === toState.tabbarName) &&
        fromState.tabIndex !== toState.tabIndex
      )
  ) {
    tabbar.setActiveTab(toState.tabIndex);
    tabbar.loadPage(toState.page, { _removeElement: true });
  }
}

export function changeTab(scope, toState, fromState) {
  const tabbarName = toState.tabbarName;

  console.log(toState, fromState);

  if (scope[tabbarName]) {
    setActiveTabByState(scope[tabbarName], toState, fromState);
  } else {
    const unwatch = scope.$watch(tabbarName, (tabbar) => {
      if (tabbar) {
        setActiveTabByState(tabbar, toState, fromState);
        unwatch();
      }
    });
  }
}


export default {
  changeTabbarPage,
  changeTab,
};
