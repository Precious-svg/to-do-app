import { useColorScheme } from '@/hooks/use-color-scheme';
import ThemeProvider  from '../context/ThemeContext';
import { Stack , Redirect} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import 'react-native-reanimated';
import '../global.css'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const StackComponent = Stack ?? (({ children }) => <>{children}</>);
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <StackComponent screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
        </StackComponent>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ConvexProvider>
  );
}
