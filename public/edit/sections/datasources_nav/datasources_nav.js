import { uiModules } from 'ui/modules';
import template from './datasources_nav.html';
import './datasources_nav.less';

const app = uiModules.get('datagen');

app.directive('datasourcesNav', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope) {
      $scope.$watch('dataplan', () => {
        $scope.treeItems = [ $scope.dataplan ];
      });
    }
  };
});
