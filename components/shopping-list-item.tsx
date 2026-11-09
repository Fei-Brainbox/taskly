import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../theme';

type Props = {
    id: string;
    name: string;
    completedAt: number | null;
    onDelete: () => void;
    toggleComplete: () => void;
}

export function ShoppingListItem({ id, name, completedAt, onDelete, toggleComplete }: Props) {
    const handleDelete = () => {
        Alert.alert(
        'Delete Item',
        `Are you sure you want to delete ${name}?`,
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => {onDelete()} }
        ]
        );
  }

  return (
    <Pressable 
        style={[styles.itemContainer, completedAt ? { backgroundColor: 'lightgreen' } : {}]}
        onPress={toggleComplete}    
    >   
    <View style={styles.row}>
        {
        <Entypo 
            name={completedAt ? "check" : "circle"}
            size={16} 
            color={completedAt ? "green" : "gray"} />
        }
        <Text 
            numberOfLines={1}
            style={[styles.text]}>
            {name}
        </Text>
    </View>
        
        <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={handleDelete}
        >
            <AntDesign name="close-circle" size={24} color={theme.colors.red} />
        </TouchableOpacity>
    </Pressable>
  );
}   


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '500',
    color: theme.colors.text,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 18,
  }
});