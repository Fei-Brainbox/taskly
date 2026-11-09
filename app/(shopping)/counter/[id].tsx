import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TimeSegments } from '../../../components/time-segments';

export default function Counter() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No item available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TimeSegments iteId={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
