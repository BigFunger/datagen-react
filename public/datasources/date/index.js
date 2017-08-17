import registry from 'plugins/datagen/datasource_registry';
import { DateSource } from './date_source';
import './date_source_ui';

registry.register(() => {
  return {
    id: 'date',
    name: 'Date',
    ViewModel: DateSource
  };
});
