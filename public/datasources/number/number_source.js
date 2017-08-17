import { assign } from 'lodash';
import { Datasource } from 'plugins/datagen/lib/datasource';

export class NumberSource extends Datasource {
  constructor(model) {
    super(
      'number',
      'Number',
      `Defines a numeric field and how to generate its values`,
      'field',
      {
        field: '',
        type: 'integer',
        scalingFactor: 1,
        rangeMin: 0,
        rangeMax: 0
      },
      model
    );

    this.types = [
      'long',
      'integer',
      'short',
      'byte',
      'double',
      'float',
      'half_float',
      'scaled_float'
    ];
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
        field: this.field || '',
        type: this.type || 'integer',
        scalingFactor: this.scalingFactor || 1,
        rangeMin: this.rangeMin || 0,
        rangeMax: this.rangeMax || 0
      }
    );
  }

  get mapping() {
    const base = super.mapping;
    const extended = {
      "type": this.type
    };
    if (this.type === 'scaled_float') {
      extended.scaling_factor = this.scalingFactor;
    }
    return assign(base, _.set({}, this.field, extended));
  }
};
