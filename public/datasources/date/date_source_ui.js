import { uiModules } from 'ui/modules';
import template from './date_source_ui.html';
import './date_source_ui.less';
import moment from 'moment';

const app = uiModules.get('data-gen');

app.directive('dateSourceUi', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.datasource = $scope.datasourceShell.datasource;

      $scope.debug = () => {
        const offsetMoment = parseDuration($scope.datasource.initialOffset);
        console.log(offsetMoment);
      }
    }
  };
});
