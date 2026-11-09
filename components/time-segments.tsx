import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { ItemType } from './types/types';
import {  getItems, saveItem } from '../utils/shopping-list-storage';



type Props = {
  iteId: string
};

export function TimeSegments({ iteId }: Props) {

  const [timer, setTimer] = useState(0);
  const [isTimerRuning, setIsTimerRuning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);  
  
  useEffect(() => {
    const loadItems = async () => {
      const items: ItemType[] | null = await getItems('shoppingList');
      const item = items?.find(i => i.id === iteId);
      if (item) {
        setTimer(item.workingTime);
      }
    };
    loadItems();
  }, [iteId]);

  const days = Math.floor(timer / 86400);
  const hours = Math.floor((timer % 86400) / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;




  // const handleToggleComplete = (id: string) => {
  //   const updatedItems = items.map(item => item.id === id ? { ...item, completedAt: item.completedAt ? null : new Date().getTime() } : item);
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //   setItems(updatedItems);
  //   saveItem(SHOPPING_LIST_KEY, updatedItems);
  // }


  useEffect(() => {

    // const interval = setInterval(() => {
    //   setTimer(timer + 1);
    // }, 1000);


    // return () => clearInterval(interval);
  },[])

  const startTimer = () => {
    if (!isTimerRuning) {
      setIsTimerRuning(true);
      const intervalid = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      intervalRef.current = intervalid;
    } 

    else {
      setIsTimerRuning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.segment}>
          <Text style={styles.time}>
            {days.toString()}
          </Text>
          <Text style={styles.label}>Days</Text>
        </View>

        <View style={styles.segment}>
          <Text style={styles.time}>
            {hours.toString()}
          </Text>
          <Text style={styles.label}>Hours</Text>
        </View>

        <View style={styles.segment}>
          <Text style={styles.time}>{minutes.toString()}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>

        <View style={styles.segment}>
          <Text style={styles.time}>{seconds.toString()}</Text>
          <Text style={styles.label}>Seconds</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.5}  
        onPress={startTimer}
      >
        <Text style={styles.buttonText}
        
        >{isTimerRuning ? 'Stop' : 'Start To Work'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap:50,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  segment: {
    flex: 1,
    color: 'red',
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});