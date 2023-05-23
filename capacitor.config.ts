import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pedroromero.howmanytimes',
  appName: 'How many times',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
