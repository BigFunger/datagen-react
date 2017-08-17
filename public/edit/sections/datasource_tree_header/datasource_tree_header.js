import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './datasource_tree_header.html';
import './datasource_tree_header.less';

const app = uiModules.get('datagen');

app.directive('datasourceTreeHeader', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      selectedItem: '=',
      datasourceCollection: '=',
      title: '@'
    },
    controllerAs: 'datasourceTreeHeader',
    bindToController: true,
    controller: function () {
      this.addDatasource = () => {
        const newDatasourceShell = this.datasourceCollection.add();
        this.selectedItem = newDatasourceShell;
      };
    }
  };
});
