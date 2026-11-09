import { Stack } from 'expo-router';

export default function ShoppingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shopping List' }} />
      <Stack.Screen name="counter/[id]" options={{ title: 'Counter' }} />
      <Stack.Screen name="counter/history" options={{ title: 'History' }} />
    </Stack>
  );
}
