angular.module('videosApp').factory('AlertService', [function() {
  return {
    addAlert: function (alerts, msg, type) {
      alerts.push({msg: msg, type: type});
    },
    closeAlert: function (alerts, index) {
      alerts.splice(index, 1);
    }
  }
}]);
