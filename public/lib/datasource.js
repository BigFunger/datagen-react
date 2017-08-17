import _ from 'lodash';

export class Datasource {
  constructor(typeId, title, helpText, mainField, defaultModel, model) {
    if (!typeId || !title) {
      throw new Error('Cannot instantiate the base Datasource class.');
    }

    this.title = title;
    this.typeId = typeId;
    this.helpText = helpText;
    this.mainField = mainField;
    this.datasourceShell = undefined;

    _.defaults(
      this,
      _.pick(model, _.keys(defaultModel)),
      defaultModel
    );
  }

  get model() {
    return {};
  }

  get mapping() {
    return {};
  }
}
