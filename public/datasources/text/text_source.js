import { assign, isEmpty } from 'lodash';
import { Datasource } from 'plugins/datagen/lib/datasource';

export class TextSource extends Datasource {
  constructor(model) {
    super(
      'text',
      'Text',
      `Defines a text field and how to generate its values`,
      'field',
      {
        field: '',
        method: 'values',
        length: 100,
        values: [],
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        analyzer: '',
        searchAnalyzer: '',
        searchQuoteAnalyzer: ''
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
        charset: this.charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        analyzer: this.analyzer || '',
        searchAnalyzer: this.searchAnalyzer || '',
        searchQuoteAnalyzer: this.searchQuoteAnalyzer || ''
      }
    );
  }

  get mapping() {
    const base = super.mapping;
    const extended = {
      "type": "text"
    };
    if (!isEmpty(this.analyzer)) {
      extended.analyzer = this.analyzer;
    }
    if (!isEmpty(this.searchAnalyzer)) {
      extended.search_analyzer = this.searchAnalyzer;
    }
    if (!isEmpty(this.searchQuoteAnalyzer)) {
      extended.search_quote_analyzer = this.searchQuoteAnalyzer;
    }
    return assign(base, _.set({}, this.field, extended));
  }
};
