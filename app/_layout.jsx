import { useColorScheme } from '@/hooks/use-color-scheme';
import ThemeProvider  from '../context/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import 'react-native-reanimated';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ConvexProvider>
  );
}
