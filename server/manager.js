import _ from 'lodash';

export function registerManager(server) {
  const schemas = {};
  const datasources = {};

  function registerDatasource(options) {
    const typeId = _.keys(options)[0];
    const sourceClass = options[typeId];
    _.set(datasources, typeId, sourceClass);
  };

  server.expose('datasources', {
    register: registerDatasource,
    datasources: datasources
  });
};
