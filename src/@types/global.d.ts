import { App, ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
//   
  interface ComponentCustomProperties {
    $assets:  (filePath: string) => string;
  }

  interface App {
    config: {
      globalProperties: {
        $assets:  (filePath: string) => string;
      };
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $assets:  (filePath: string) => string;
  }
}
