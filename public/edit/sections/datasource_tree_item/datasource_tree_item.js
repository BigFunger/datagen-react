import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './datasource_tree_item.html';
import './datasource_tree_item.less';

const app = uiModules.get('datagen');

app.directive('datasourceTreeItem', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      datasourceShell: '=',
      rootTree: '='
    },
    controllerAs: 'datasourceTreeItem',
    bindToController: true,
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function ($scope) {
      if (this.datasourceShell.constructor.name !== 'DatasourceShell') return;

      this.childItems = [];
      this.delete = () => {
        this.datasourceShell.parentDatasourceCollection.remove(this.datasourceShell);
        if (this.datasourceShell.dataplan.datasourceCollection.datasourceShells.length > 0) {
          this.rootTree.selectItem(this.datasourceShell.dataplan);
        } else {
          this.rootTree.selectItem(undefined);
        }
      };

      this.selectItem = () => {
        this.rootTree.selectItem(this.datasourceShell);
      };
    }
  };
});
