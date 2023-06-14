import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY = 'pk_test_51N8jx1SAkzcwTJBgOtORZc0zxRENB3J78IrHPdVbGNQHOYKKAO5hdxmZt2rMTemPiYgSYUqMvLKHn6RvsZnRSO9Z00XqNGR4b6';

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Navigation />
      </StripeProvider>
      <StatusBar style="auto" />
    </Provider>
  );
}
