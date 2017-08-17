import _ from 'lodash';

export class NumberSource {
  constructor(datasource) {
    this.datasource = datasource;
  }

  generate() {
    const datasource = this.datasource;
    const floatingTypes = {
      long: false,
      integer: false,
      short: false,
      byte: false,
      double: true,
      float: true,
      half_float: true,
      scaled_float: true
    };
    const isFloating = floatingTypes[datasource.type];
    const value = _.random(datasource.rangeMin, datasource.rangeMax, isFloating);

    return _.set({}, datasource.field, value);
  }
};