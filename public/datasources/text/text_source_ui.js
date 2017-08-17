import { uiModules } from 'ui/modules';
import template from './text_source_ui.html';
import './text_source_ui.less';

const app = uiModules.get('data-gen');

app.directive('textSourceUi', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.datasource = $scope.datasourceShell.datasource;
    }
  };
});
