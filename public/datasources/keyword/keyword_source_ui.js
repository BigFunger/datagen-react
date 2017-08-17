import { uiModules } from 'ui/modules';
import template from './keyword_source_ui.html';
import './keyword_source_ui.less';

const app = uiModules.get('data-gen');

app.directive('keywordSourceUi', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.datasource = $scope.datasourceShell.datasource;
    }
  };
});
