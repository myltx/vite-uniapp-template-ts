import { App, ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
//   
  interface ComponentCustomProperties {
    $assets:  (filePath: string) => string;
    $setRemoteBg: (filePath: string, config?: CSSProperties) => CSSProperties;
  }

  interface App {
    config: {
      globalProperties: {
        $assets:  (filePath: string) => string;
        $setRemoteBg: (filePath: string, config?: CSSProperties) => CSSProperties;
      };
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $assets:  (filePath: string) => string;
    $setRemoteBg: (filePath: string, config?: CSSProperties) => CSSProperties;
  }
}
