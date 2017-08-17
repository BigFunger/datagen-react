import { NumberSource } from './number_source';

export function registerNumber (server) {
  const datagen = server.plugins.datagen;

  datagen.datasources.register({
    number: {
      class: NumberSource
    }
  });
}
