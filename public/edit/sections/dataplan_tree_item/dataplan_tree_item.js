import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './dataplan_tree_item.html';
import './dataplan_tree_item.less';

const app = uiModules.get('pipelines');

app.directive('dataplanTreeItem', function (RecursionHelper) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      expanded: '=',
      dataplan: '=',
      rootTree: '='
    },
    controllerAs: 'dataplanTreeItem',
    bindToController: true,
    compile: function (element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    },
    controller: function () {
      if (this.dataplan.constructor.name !== 'Dataplan') return;

      this.childItems = this.dataplan.datasourceCollection.datasourceShells;

      this.selectItem = () => {
        this.rootTree.selectItem(this.dataplan);
      };
    }
  };
});
