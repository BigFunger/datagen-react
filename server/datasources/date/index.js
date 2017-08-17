import { DateSource } from './date_source';

export function registerDate (server) {
  const datagen = server.plugins.datagen;

  datagen.datasources.register({
    date: {
      class: DateSource
    }
  });
}
