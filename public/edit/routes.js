import routes from 'ui/routes';
import { Dataplan } from 'plugins/datagen/lib/dataplan';
import datasourceRegistryProvider from 'plugins/datagen/datasource_registry';
import { DatagenProvider } from 'plugins/datagen/service';

routes
.when('/management/elasticsearch/datagen/', {
  template: '<datagen-edit></datagen-edit>',
  resolve: {
    init: (Private) => {
      const service = Private(DatagenProvider);
      return service.init();
    },
    dataplan: (Private) => {
      const datasourceRegistry = Private(datasourceRegistryProvider);

      const dataplan = new Dataplan(datasourceRegistry);
      window.dataplan = dataplan;
      return dataplan;
    }
  }
});
