import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './datasource_tree.html';
import './datasource_tree.less';

const app = uiModules.get('datagen');

app.directive('datasourceTree', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      items: '=',
      selected: '=',
      rootTree: '='
    },
    controllerAs: 'datasourceTree',
    bindToController: true,
    controller: function () {
      this.rootTree = this.rootTree || this;

      this.selectItem = function (item) {
        this.selected = item;
      };
    }
  };
});
