import _ from 'lodash';

export class DatasourceShell {

  constructor(dataplan, parentDatasourceCollection, model) {
    this.dataplan = dataplan;
    this.datasource = undefined;
    this.datasourceTypes = this.dataplan.datasourceRegistry.byId;
    this.parentDatasourceCollection = parentDatasourceCollection;

    const defaultModel = {
      datasourceId: dataplan.getNewDatasourceId(),
      typeId: undefined
    };

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );

    if (this.typeId) {
      const initialTypeId = this.typeId;
      this.typeId = undefined;
      this.setTypeId(initialTypeId, model);
    }
  }

  setTypeId(typeId, datasourceModel) {
    if (typeId === this.typeId) return;

    this.typeId = typeId;
    this.sourceId = this.dataplan.getNewDatasourceId(this.typeId);
    const DatasourceType = this.datasourceTypes[typeId].ViewModel;

    datasourceModel = datasourceModel || _.get(this.datasource, 'model');
    this.datasource = new DatasourceType(datasourceModel);

    this.datasource.datasourceShell = this;
  }

  get description() {
    if (this.datasource) {
      return this.datasource.description;
    } else {
      return '';
    }
  }

  get title() {
    if (this.datasource) {
      return this.datasource.title;
    } else {
      return 'New Source';
    }
  }

  get mapping() { return this.datasource.mapping }

  get model() {
    const result = _.assign(
      {},
      _.get(this.datasource, 'model'),
      {
        datasourceId: this.datasourceId,
        typeId: this.typeId
      });

    return result;
  }

}
