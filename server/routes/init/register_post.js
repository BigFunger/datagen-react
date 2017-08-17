import { random, reduce } from 'lodash';
import { callWithRequestFactory } from '../../lib/call_with_request_factory';

function loadMapping(callWithRequest) {
  return callWithRequest('transport.request', {
    path: `/datagen/_mapping/dataplan`,
    method: 'GET'
  })
  .then((response) => {
    return response;
  })
  .catch((er) => {
    if (er.statusCode === 404) {
      return undefined;
    }
    return er;
  });
}

//TODO: I'm not sure this is working correctly... since I had to initialize the
//mapping for dataplan in init. :(
function createMapping(callWithRequest) {
  const body = {
    "mappings": {
      "dataplan": {
        "properties": {
          "definition": {
            "type": "object"
          }
        }
      }
    }
  };

  return callWithRequest('transport.request', {
    path: `/datagen`,
    method: 'PUT',
    body: body
  });
}

export default (server) => {
  server.route({
    path: '/api/kibana/datagen/init',
    method: 'POST',
    handler: function (request, reply) {
      const callWithRequest = callWithRequestFactory(server, request);

      return loadMapping(callWithRequest)
      .then(mapping => {
        if (mapping) return reply();

        return createMapping(callWithRequest)
        .then(reply);
      })
      .catch((er) => {
        console.log(er);
        reply(er);
      })
    }
  });
};
