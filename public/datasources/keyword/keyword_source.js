import { assign, isEmpty } from 'lodash';
import { Datasource } from 'plugins/datagen/lib/datasource';

export class KeywordSource extends Datasource {
  constructor(model) {
    super(
      'keyword',
      'Keyword',
      `Defines a keyword field and how to generate its values`,
      'field',
      {
        field: '',
        method: 'values',
        length: 100,
        values: [],
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` [${this.field}]`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        method: this.method,
        field: this.field || '',
        length: this.length || 0,
        values: this.values || [],
        charset: this.charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      }
    );
  }

  get mapping() {
    const base = super.mapping;
    const extended = {
      "type": "keyword"
    };
    return assign(base, _.set({}, this.field, extended));
  }
};
