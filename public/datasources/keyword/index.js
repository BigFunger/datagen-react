import registry from 'plugins/datagen/datasource_registry';
import { KeywordSource } from './keyword_source';
import './keyword_source_ui';

registry.register(() => {
  return {
    id: 'keyword',
    name: 'Keyword',
    ViewModel: KeywordSource
  };
});
