import { TextSource } from './text_source';

export function registerText (server) {
  const datagen = server.plugins.datagen;

  datagen.datasources.register({
    text: {
      class: TextSource
    }
  });
}
