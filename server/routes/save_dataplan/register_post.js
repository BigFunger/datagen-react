import { random, reduce } from 'lodash';
import { callWithRequestFactory } from '../../lib/call_with_request_factory';

function saveDataplan(callWithRequest, dataplanId, dataplan) {
  const body = {
    definition: dataplan
  };

  return callWithRequest('index', {
    index: 'datagen',
    type: 'dataplan',
    id: dataplanId,
    body: body
  });
}

export default (server) => {
  server.route({
    path: '/api/kibana/datagen/save/{id}',
    method: 'POST',
    handler: function (request, reply) {
      const dataplanId = request.params.id;
      const callWithRequest = callWithRequestFactory(server, request);
      const dataplan = request.payload;

      return saveDataplan(callWithRequest, dataplanId, dataplan)
      .then(reply)
      .catch((er) => {
        console.log(er);
        reply(er);
      })
    }
  });
};
