import { random, reduce } from 'lodash';
import { callWithRequestFactory } from '../../lib/call_with_request_factory';
import uuid from 'node-uuid';
import { randomItem } from '../../lib/random_item';
import { updateMapping } from './update_mapping';
import { generateData } from './generate_data';

export default (server) => {
  server.route({
    path: '/api/kibana/datagen/generate',
    method: 'POST',
    handler: function (request, reply) {
      const callWithRequest = callWithRequestFactory(server, request);
      const promises = [];
      const dataplan = request.payload;

      return updateMapping(callWithRequest, dataplan)
      .then((mapping) => {
        // console.log(`mapping created. ${mapping}`)
        return generateData(callWithRequest, dataplan, server);
      })
      .then(reply)
      .catch((er) => {
        console.log(er);
        reply(er);
      })
    }
  });
};
