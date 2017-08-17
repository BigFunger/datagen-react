import registry from 'plugins/datagen/datasource_registry';
import { NumberSource } from './number_source';
import './number_source_ui';

registry.register(() => {
  return {
    id: 'number',
    name: 'Number',
    ViewModel: NumberSource
  };
});
