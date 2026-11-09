import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../theme';
import { ItemType } from './types/types';
import { router } from 'expo-router';

type Props = {
    item: ItemType;
    onDelete: () => void;
}

export function ShoppingListItem({ item, onDelete }: Props) {
    const handleDelete = () => {
        Alert.alert(
        'Delete Item',
        `Are you sure you want to delete ${item.name}?`,
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => {onDelete()} }
        ]
        );
    }

    const gotoTask = () => {
        console.log('navigations to item', item.id);
        router.push(`/counter/${item.id}`);
    }

  return (
    <Pressable 
        style={[styles.itemContainer, item.completedAt ? { backgroundColor: 'lightgreen' } : {}]}
        onPress={gotoTask}    
    >   
    <View style={styles.row}>
        {
        <Entypo 
            name={item.completedAt ? "check" : "circle"}
            size={16} 
            color={item.completedAt ? "green" : "gray"} />
        }
        <Text 
            numberOfLines={1}
            style={[styles.text]}>
            {item.name}
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