import _ from 'lodash';
import uuid from 'node-uuid';
import moment from 'moment';

export function generateData(callWithRequest, dataplan, server) {
  const promises = [];

  for (let i=0;i < dataplan.numberOfDocuments;i++) {
    promises.push(indexDocument(callWithRequest, dataplan, server));
  }

  return mapSeries(promises);
}

function modifyDate(body) {
  const m = moment(body['@timestamp']);
  body['@timestamp'] = m.startOf('month').startOf('day').toISOString();
}

function indexDocument(callWithRequest, dataplan, server) {
  const datasourceClasses = server.plugins.datagen.datasources.datasources;
  const body = {};
  _.forEach(dataplan.datasources, (datasource) => {
    const GeneratorClass = datasourceClasses[datasource.typeId].class;
    const generator = new GeneratorClass(datasource);
    const patch = generator.generate();

    Object.assign(body, patch);
  });

  //TODO create a mechanic for adding scripts to modify the data.
  //modifyDate(body);

  return callWithRequest('index', {
    index: dataplan.indexName,
    type: dataplan.typeName,
    id: uuid.v4(),
    body: body
  });
}

function mapSeries(arr) {
  if (!Array.isArray(arr)) throw new Error('mapSeries requires an Array');
  const length = arr.length;
  const results = new Array(length);

  arr.reduce((chain, item, i) => {
    return chain.then(() => item).then(val => results[i] = val);
  }, Promise.resolve())
  .then(() => results);
}