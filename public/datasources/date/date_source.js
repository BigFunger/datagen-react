import { assign } from 'lodash';
import { Datasource } from 'plugins/datagen/lib/datasource';
import parseDuration from 'duration-parser';

function getDuration(durationText) {
  try {
    return parseDuration(durationText);
  } catch(err) {
    return 0;
  };
}

export class DateSource extends Datasource {
  constructor(model) {
    super(
      'date',
      'Date',
      `Defines a date field and how to generate its values`,
      'field',
      {
        field: '',
        method: 'now',
        value: '',
        startDate: '',
        endDate: '',
        applyNormalDistribution: false,
        initialOffset: '',
        distributionWindow: '',
        distributionOffset: ''
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
        value: this.value || '',
        startDate: this.startDate || '',
        endDate: this.endDate || '',
        applyNormalDistribution: this.applyNormalDistribution,
        initialOffset: getDuration(this.initialOffset),
        distributionWindow: getDuration(this.distributionWindow),
        distributionOffset: getDuration(this.distributionOffset)
      }
    );
  }

  get mapping() {
    const base = super.mapping;
    const extended = {
      "type": "date"
    };
    return assign(base, _.set({}, this.field, extended));
  }
};
