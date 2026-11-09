import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key: string, data: object) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving item:', error);
    }
}

export async function getItem(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
}