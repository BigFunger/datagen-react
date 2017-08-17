import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './datasources.html';
import './datasources.less';

const app = uiModules.get('datagen');

app.directive('datasources', function () {
  return {
    restrict: 'E',
    template: template,
    controllerAs: 'datasources',
    controller: function ($scope) {
      $scope.$watch('datasources.selectedItem', (selectedItem) => {
        if (selectedItem && selectedItem.constructor.name === 'DatasourceShell') {
          this.selectedDatasourceShell = selectedItem;
        } else {
          this.selectedDatasourceShell = undefined;
        }
      });

      $scope.$watch('dataplan', () => {
        this.dataplan = $scope.dataplan;
        this.selectedItem = _.first(this.dataplan.datasourceCollection.datasourceShells);
      });
    }
  };
});
