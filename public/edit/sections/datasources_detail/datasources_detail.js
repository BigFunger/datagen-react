import { uiModules } from 'ui/modules';
import template from './datasources_detail.html';
import './datasources_detail.less';

const app = uiModules.get('pipelines');

app.directive('datasourcesDetail', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
    }
  };
});
