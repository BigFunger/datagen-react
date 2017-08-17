import _ from 'lodash';

export function updateMapping(callWithRequest, dataplan) {
  return loadMapping(callWithRequest, dataplan)
  .then((mapping) => {
    if (!mapping) {
      console.log('CREATE MAPPING');
      return createMapping(callWithRequest, dataplan);
    } else {
      console.log('CHANGE MAPPING');
      return changeMapping(callWithRequest, dataplan, mapping);
    }
  });
}

function changeMapping(callWithRequest, dataplan, mapping) {
  // console.log('**************************************************');
  // console.log('Change mapping')
  // console.log('**************************************************');
  // console.log(JSON.stringify(mapping));
  // console.log('**************************************************');
  // console.log(JSON.stringify(dataplan.mapping));
  // console.log('**************************************************');
  // console.log('');

  const typeMapping = _.get(dataplan.mapping, `mappings.${dataplan.typeName}`);

  return callWithRequest('transport.request', {
    path: `/${dataplan.indexName}/_mapping/${dataplan.typeName}`,
    method: 'PUT',
    body: typeMapping
  })
  .then((response) => {
    return response;
  })
  .catch((er) => {
    throw `Updating the mapping is not yet implemented. Delete your index using: DELETE ${dataplan.indexName}`
  });
}

function createMapping(callWithRequest, dataplan) {
  return callWithRequest('transport.request', {
    path: `/${dataplan.indexName}`,
    method: 'PUT',
    body: dataplan.mapping
  })
  .then((response) => {
    return response;
  });
}

function loadMapping(callWithRequest, dataplan) {
  return callWithRequest('transport.request', {
    path: `/${dataplan.indexName}/_mapping/${dataplan.typeName}`,
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
