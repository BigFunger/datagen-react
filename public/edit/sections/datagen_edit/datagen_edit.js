import { uiModules } from 'ui/modules';
import template from './datagen_edit.html';
import { Notifier } from 'ui/notify/notifier';
import generateDataTemplate from './generate_data_partial.html';
import loadTemplate from './load_partial.html';
import saveTemplate from './save_partial.html';
import { DatagenProvider } from 'plugins/datagen/service';
import './datagen_edit.less';
import datasourceRegistryProvider from 'plugins/datagen/datasource_registry';
import angular from 'angular';
import { Dataplan } from 'plugins/datagen/lib/dataplan';

const app = uiModules.get('datagen');

app.directive('datagenEdit', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $route, Private) {
      $scope.notifier = new Notifier({ location: 'Datagen' });
      $scope.dataplan = $route.current.locals.dataplan;
      const datasourceRegistry = Private(datasourceRegistryProvider);
      const service = Private(DatagenProvider);

      $scope.topNavOpts = {
        dataplan: $scope.dataplan,
        generateData: () => {
          service.generate($scope.dataplan.model)
          .then((response) => {
            $scope.notifier.info(`Generating data...`);
          })
          .catch((er) => {
            $scope.notifier.error(er);
          });
        },
        saveDataplan: () => {
          service.save($scope.dataplan.model, $scope.topNavScope.dataplanId)
          .then((response) => {
            $scope.notifier.info(`Dataplan ${$scope.topNavScope.dataplanId} saved!`);
          })
          .catch((er) => {
            $scope.notifier.error(er);
          });
        },
        loadDataplan: () => {
          //todo just redirect and do the loading in the resolve of the route.
          service.load($scope.topNavScope.dataplanId)
          .then((dataplan) => {
            $scope.dataplan = new Dataplan(datasourceRegistry, dataplan);
            $scope.notifier.info(`Dataplan ${$scope.topNavScope.dataplanId} loaded!`);
          })
          .catch((er) => {
            $scope.notifier.error(er);
          });
        }
      };


      $scope.topNavMenu = [{
        key: 'load',
        template: loadTemplate,
        description: 'Load'
      },
      {
        key: 'save',
        template: saveTemplate,
        description: 'Save'
      },
      {
        key: 'generate data',
        template: generateDataTemplate,
        description: 'Generate Data'
      }];

      $scope.topNavScope = {
        dataplanId: ''
      };
    }
  };
});
