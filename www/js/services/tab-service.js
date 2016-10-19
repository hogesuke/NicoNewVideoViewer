angular.module('videosApp').factory('TabService', [function() {
  return {
    tabs: [
      { id: 'my', name: 'マイ新着動画', partial: './partials/myVideoList.part.html', contributor_id: '' },
      { id: 'all', name: 'すべての新着動画', partial: './partials/newVideoList.part.html', contributor_id: '' }
    ],
    getTabs: function () {
      return this.tabs;
    },
    addTab: function (id, name, partial, contributorId) {
      if (this.tabs[this.tabs.length - 1].contributor_id) {
        this.tabs.pop();
      }
      this.tabs.push({ id: id, name: name, partial: partial, contributor_id: contributorId, active: true });
    },
    getContributorId: function () {
      return this.tabs[this.tabs.length - 1].contributor_id;
    },
    setActiveTab: function (id) {
      angular.forEach(this.tabs, function(tab) {
        if (tab.id === id) {
          tab.active = true;
        }
      })
    }
  };
}]);
