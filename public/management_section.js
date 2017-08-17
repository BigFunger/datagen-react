import { management } from 'ui/management';

management.getSection('elasticsearch').register('datagen', {
  display: 'Data Generation',
  order: 3,
  url: '#/management/elasticsearch/datagen/'
});
