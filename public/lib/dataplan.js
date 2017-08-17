import _ from 'lodash';
import { DatasourceCollection } from './datasource_collection';

export class Dataplan {
  constructor(datasourceRegistry, model) {
    const defaultModel = {
      dataplanId: '',
      indexName: 'sample-data',
      typeName: 'documents',
      numberOfDocuments: 1000
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    this.datasourceRegistry = datasourceRegistry;
    this.datasourceCollection = new DatasourceCollection(this);
    this.datasourceCounters = {};

    _.forEach(_.get(model, 'datasources'), datasourceModel => {
      this.datasourceCollection.add(datasourceModel);
    });
  }

  get model() {
    const result = {
      dataplanId: this.dataplanId,
      datasources: this.datasourceCollection.model,
      indexName: this.indexName,
      typeName: this.typeName,
      numberOfDocuments: this.numberOfDocuments,
      mapping: this.mapping
    };

    return result;
  }

  get title() {
    return `${this.numberOfDocuments} docs => '${this.indexName}.${this.typeName}'`;
  }

  get mapping() {
    const result = {
      'mappings': {}
    };
    _.set(result.mappings, this.typeName, { properties: this.datasourceCollection.mapping});
    return result;
  }

  getNewDatasourceId(typeId) {
    typeId = typeId || 'new_datasource';
    const counter = (_.get(this.datasourceCounters, typeId) || 0) + 1;
    _.set(this.datasourceCounters, typeId, counter);

    return `${typeId}_${counter}`;
  }
}
