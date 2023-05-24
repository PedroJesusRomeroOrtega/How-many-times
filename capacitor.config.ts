import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pedroromero.howmanytimes',
  appName: 'How many times',
  webDir: 'dist/how-many-times',
  server: {
    androidScheme: 'https',
  },
};

export default config;
