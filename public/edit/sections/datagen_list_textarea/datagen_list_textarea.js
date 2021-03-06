import { uiModules } from 'ui/modules';
import template from './datagen_list_textarea.html';
import { compact, map, trim } from 'lodash';

const app = uiModules.get('pipelines');

app.directive('datagenListTextarea', function () {
  return {
    restrict: 'E',
    template: template,
    scope: {
      list: '=',
      splitOnComma: '@',
      name: '@'
    },
    controller: function ($scope) {
      $scope.splitOnComma = !!$scope.splitOnComma;

      function splitValues(delimitedList) {
        return delimitedList.split('\n');
      }

      function joinValues(valueArray) {
        return valueArray.join('\n');
      }

      function updateList() {
        let valuesString = $scope.values;
        if ($scope.splitOnComma) {
          valuesString = valuesString.replace(/,/g, '\n');
        }

        let list = splitValues(valuesString);
        list = compact(list);
        //list = map(list, value => trim(value));

        $scope.list = list;
        $scope.values = joinValues($scope.list);
      }

      $scope.values = joinValues($scope.list);

      $scope.$watch('values', updateList);
    }
  };
});
