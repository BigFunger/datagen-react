import _ from 'lodash';
import { DatasourceShell } from './datasource_shell';

export class DatasourceCollection {
  constructor(dataplan) {
    this.dataplan = dataplan;
    this.datasourceShells = [];
  }

  add(sourceModel) {
    const datasourceShell = new DatasourceShell(this.dataplan, this, sourceModel);
    this.datasourceShells.push(datasourceShell);
    return datasourceShell;
  }

  remove(datasourceShell) {
    const index = this.datasourceShells.indexOf(datasourceShell);
    this.datasourceShells.splice(index, 1);
  }

  get model() {
    const result = [];

    _.forEach(this.datasourceShells, (datasourceShell) => {
      result.push(datasourceShell.model);
    });

    return result;
  }

  get mapping() {
    const result = {};

    _.forEach(this.datasourceShells, (datasourceShell) => {
      _.assign(result, datasourceShell.mapping);
    });

    return result;
  }
}
