import _ from 'lodash';
import moment from 'moment';
import gaussian from 'gaussian';

// field: '',
// method: 'now',
// value: '',
// startDate: '',
// endDate: '',
// initialOffset: '',
// distributionWindow: '',
// distributionOffset: ''


export class DateSource {
  constructor(datasource) {
    this.datasource = datasource;
  }

  generate() {
    const datasource = this.datasource;

    let value
    if (datasource.method === 'now') {
      const date = new Date();
      value = date.getTime();
    }

    if (datasource.method === 'value') {
      const date = new Date(datasource.value);
      value = date.getTime();
    }

    if(datasource.method === 'range') {
      const startDate = new Date(datasource.startDate).getTime();
      const endDate = new Date(datasource.endDate).getTime();
      const range = endDate - startDate;
      value = startDate + _.random(range);

      if (datasource.applyNormalDistribution) {
        const fullRange = endDate - startDate;
        const limitedRange = fullRange - datasource.initialOffset;
        const windowAndOffset = datasource.distributionWindow + datasource.distributionOffset;
        const windowCount = Math.round(limitedRange / windowAndOffset, 0);
        const windowIndex = _.random(windowCount);
        const windowStart = startDate + datasource.distributionOffset + (windowAndOffset * (windowIndex));

        const standardDeviations = 3;
        const mean = datasource.distributionWindow / 2;
        const variance = (mean / 3) * (mean / 3);

        const distribution = gaussian(mean, variance);
        const weightedValue = distribution.ppf(Math.random());
        const date = new Date(windowStart + weightedValue);
        value = date.getTime();
      }
    }

    return {
      [datasource.field]: value
    };
  }
};