import expect from 'expect.js';
import { DateSource } from '../date_source';

describe('datagen', () => {

  describe('date_source', () => {

    describe('generate', () => {

      it(`method: now generates a date with the current date value`, () => {
        const datasource = {
          field: 'foo',
          method: 'now'
        };
        const datesource = new DateSource(datasource);

        const expected = {
          foo: '1234'
        };
        const actual = datesource.generate();
        expect(actual).to.eql(expected);
      });

    });

  });

});
