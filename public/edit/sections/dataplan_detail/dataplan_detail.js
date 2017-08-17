import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './dataplan_detail.html';
import './dataplan_detail.less';

const app = uiModules.get('datagen');

app.directive('dataplanDetail', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      dataplan: '=',
      datasources: '='
    },
    controller: function ($scope) {
    }
  };
});
