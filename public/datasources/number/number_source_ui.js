import { uiModules } from 'ui/modules';
import template from './number_source_ui.html';
import './number_source_ui.less';

const app = uiModules.get('data-gen');

app.directive('numberSourceUi', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.datasource = $scope.datasourceShell.datasource;
    }
  };
});
