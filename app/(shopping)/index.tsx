import { StyleSheet, View, TextInput, FlatList, Text, LayoutAnimation } from 'react-native';
import { ItemType } from '../../components/types/types';
import { ShoppingListItem as ShoppingListItemComponent } from '../../components/shopping-list-item';
import { useEffect, useState } from 'react';
import { saveItem, getItems } from '../../utils/shopping-list-storage';
import * as Haptics from 'expo-haptics';

const SHOPPING_LIST_KEY = 'shoppingList';
export default function Index() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      const savedItems = await getItems(SHOPPING_LIST_KEY);
      if (savedItems) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems(savedItems);
      }
    };
    loadItems();
  }, []);

  const handleAddItem = () => {
    if (value.trim() !== '') {
      if(items.some(item => item.name.toLowerCase() === value.trim().toLowerCase())) {
        setValue('');
        return;
      };
      const newList = [
        {id: new Date().getTime().toString(), name: value, completedAt: null, workingTime: 0}, 
        ...items
      ];
      setItems(newList);
      saveItem(SHOPPING_LIST_KEY, newList);
      setValue('');
    }
  }

  const handleDeleteItem = (id: string) => {
    const afterDeletion = items.filter(item => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(afterDeletion);
    saveItem(SHOPPING_LIST_KEY, afterDeletion);
  }
  
  return (
    <FlatList 
      style={styles.container}
      data={orderShoppingList(items)}
      contentContainerStyle={styles.itemContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={(
        <TextInput
          style={styles.input}
          placeholder="Eg. Milk, Eggs, Bread"
          value={value}
          onChangeText={(value) => setValue(value)}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
          submitBehavior="submit"
        />
      )}
      ListEmptyComponent={() => (
        <View style={{ padding: 20 }}>
          <Text>No items in the list</Text>
        </View>
      )}
      renderItem={({ item }) => {
        return <ShoppingListItemComponent 
          item={item}
          onDelete={() => handleDeleteItem(item.id)} 
        />
      }}
      
    />
  );
}

function orderShoppingList(shoppingList: ItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAt && item2.completedAt) {
      return item2.completedAt - item1.completedAt;
    }

    if (item1.completedAt && !item2.completedAt) {
      return 1;
    }

    if (!item1.completedAt && item2.completedAt) {
      return -1;
    }

    if (!item1.completedAt && !item2.completedAt) {
      return item2.id.localeCompare(item1.id);
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightgray'
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  links: {
    marginBottom: 10,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    borderRadius: 5 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'white'
  }
});
