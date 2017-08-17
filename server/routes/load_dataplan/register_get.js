import { random, reduce, get } from 'lodash';
import { callWithRequestFactory } from '../../lib/call_with_request_factory';

function loadDataplan(callWithRequest, dataplanId) {
  return callWithRequest('get', {
    index: 'datagen',
    type: 'dataplan',
    id: dataplanId
  });
}

export default (server) => {
  server.route({
    path: '/api/kibana/datagen/load/{id}',
    method: 'GET',
    handler: function (request, reply) {
      const dataplanId = request.params.id;
      const callWithRequest = callWithRequestFactory(server, request);

      return loadDataplan(callWithRequest, dataplanId)
      .then((response) => {
        const dataplan = get(response, '_source.definition');
        reply(dataplan);
      })
      .catch((er) => {
        console.log(er);
        reply(er);
      })
    }
  });
};
