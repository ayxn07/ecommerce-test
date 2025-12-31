import { Provider } from 'react-redux';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { store } from '@/src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
      <StatusBar style="dark" />
    </Provider>
  );
}
