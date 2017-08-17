import { registerManager } from './server/manager';
import { registerDatasources } from './server/datasources';
import { registerRoutes } from './server/routes';

module.exports = function (kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],
    main: 'plugins/datagen/jimtest',
    uiExports: {
      managementSections: [
        'plugins/datagen',
      ]
    },
    init: (server) => {
      registerManager(server);
      registerDatasources(server);
      registerRoutes(server);
    }
  });
};
