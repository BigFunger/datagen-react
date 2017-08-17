import _ from 'lodash';
import $ from 'jquery';
import { uiModules } from 'ui/modules';
import template from './datasource_detail.html';
import './datasource_detail.less';
import gaussian from 'gaussian';

const app = uiModules.get('datagen');

app.directive('datasourceDetail', function ($compile, $timeout) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      dataplan: '=',
      datasourceShell: '=',
      datasources: '='
    },
    link: function ($scope, $el) {
      const dataplan = $scope.dataplan;
      const $container = $el.find('.datasource-detail-content');

      function updateUi() {
        const datasourceShell = $scope.datasourceShell;
        $container.empty();

        if (!datasourceShell) return;

        const newScope = $scope.$new();
        newScope.datasourceShell = datasourceShell;
        const typeId = datasourceShell.typeId;

        if (typeId) {
          const template = `<${typeId}-source-ui></${typeId}-source-ui>`;
          const $innerEl = $(template);
          const postLink = $compile($innerEl);
          $container.append($innerEl);
          postLink(newScope);
        }
      }

      $scope.$watch('typeId', (typeId) => {
        if (!typeId) return;

        const datasourceShell = $scope.datasourceShell;
        datasourceShell.setTypeId(typeId);
        updateUi();
      });

      $scope.$watch('datasourceShell', (datasourceShell) => {
        const oldTypeId = $scope.typeId;

        $scope.typeId = _.get(datasourceShell, 'typeId');
        if (oldTypeId === $scope.typeId) {
          updateUi();
        }

        // $timeout(() => {
        //   const $select = $el.find('.ui-select-focusser');
        //   const $selectScope = $select.scope();
        //   $selectScope.$select.setFocus();
        // });
      });
    }
  };
});
