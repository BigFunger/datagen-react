import _ from 'lodash';
import { uiModules } from 'ui/modules';
import template from './datasource_type_select.html';
import datasourceRegistryProvider from 'plugins/datagen/datasource_registry';
import './datasource_type_select.less';

const app = uiModules.get('datagen');

function buildDatasourceTypeList(datasourceRegistry) {
  const result = [];
  _.forIn(datasourceRegistry.byId, (registryItem) => {
    const instance = new registryItem.ViewModel();
    if (instance.typeId !== 'unknown') {
      result.push({
        typeId: instance.typeId,
        title: instance.title,
        helpText: instance.helpText
      });
    }
  });

  return _(result)
    .compact()
    .sortBy('title')
    .value();
}

app.directive('datasourceTypeSelect', function ($timeout, Private, Notifier) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      typeId: '='
    },
    link: function ($scope, $el, attr) {
      const notify = new Notifier({ location: `Ingest Pipeline Setup` });
      const datasourceRegistry = Private(datasourceRegistryProvider);

      $scope.datasourceTypes = buildDatasourceTypeList(datasourceRegistry);
      const datasourceTypesById = _.reduce($scope.datasourceTypes, (result, datasourceType) => {
        return _.set(result, datasourceType.typeId, datasourceType);
      }, {});

      $scope.$watch('selectedItem.value', (newVal) => {
        if (!newVal) return;

        $scope.typeId = newVal.typeId;
        $scope.previousSelectedItem = $scope.selectedItem;
      });

      $scope.$watch('typeId', (typeId) => {
        if (!typeId) {
          $scope.selectedItem = { value: '' };

          // $timeout(() => {
          //   $el.find('.ui-select-focusser')[0].focus();
          // });
        } else {
          const datasourceType = datasourceTypesById[typeId];
          $scope.selectedItem = { value: datasourceType };
        }
      });
    }
  };
});

app.directive('datasourceTypeSelectTweaks', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      const select = $scope.$select;

      $timeout(() => {
        const searchBox = $el.find('.ui-select-search');
        searchBox.blur((event) => {
          if (select.items.length === 0) {
            select.open = false;
          }
        });
        $el.find('.ui-select-toggle').removeClass('btn btn-default');
      });
    }
  };
});
