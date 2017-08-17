import { once } from 'lodash';

const callWithRequest = once((server) => {
  const config = Object.assign({ plugins: [ ] }, server.config().get('elasticsearch'));
  const cluster = server.plugins.elasticsearch.createCluster('datagen', config);

  return cluster.callWithRequest;
});

export const callWithRequestFactory = (server, request) => {
  return (...args) => {
    return callWithRequest(server)(request, ...args);
  };
};
