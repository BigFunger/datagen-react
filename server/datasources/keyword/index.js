import { KeywordSource } from './keyword_source';

export function registerKeyword (server) {
  const datagen = server.plugins.datagen;

  datagen.datasources.register({
    keyword: {
      class: KeywordSource
    }
  });
}
