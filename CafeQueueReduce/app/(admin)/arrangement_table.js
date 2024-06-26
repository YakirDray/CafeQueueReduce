import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert ,Pressable} from 'react-native';
import { supabase } from '../../Supabase'; 
import { useRouter } from 'expo-router';
const WeeklyScheduleScreen = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [day, setDay] = useState('');
  const [hours, setHours] = useState('');
  const [scheduleData, setScheduleData] = useState([]);
  const router=useRouter()
  const addScheduleEntry = () => {
    const newEntry = { employeeName, day, hours: hours.split(',').map(hour => hour.trim()) };
    setScheduleData([...scheduleData, newEntry]);
  };

  const saveScheduleToServer = async () => {
    try {
      const { error } = await supabase
        .from('schedules')
        .insert([{
         
          data: scheduleData,
        }]);
      if (error) {
        throw error;
      }
        
      Alert.alert("Success", "Schedule saved successfully.");
      console.log(scheduleData)
    } catch (error) {
      Alert.alert("Error saving schedule", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={setEmployeeName}
        style={styles.input}
      />
      <TextInput
        placeholder="Day (e.g., Monday)"
        value={day}
        onChangeText={setDay}
        style={styles.input}
      />
      <TextInput
        placeholder="Hours (e.g., 8-9,10-11)"
        value={hours}
        onChangeText={setHours}
        style={styles.input}
      />
      <Button title="Add Schedule Entry" onPress={addScheduleEntry} />
      <Button title="Save Schedule to Server" onPress={saveScheduleToServer} color="#0066CC" />
      <Pressable
          onPress={() => router.replace("/homeAdmin")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.back}>חזור</Text>
        </Pressable>
      {scheduleData.map((entry, index) => (
        <View key={index} style={styles.entry}>
          <Text>{entry.employeeName} - {entry.day} - {JSON.stringify(entry.hours)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
  },
  entry: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  back:{
    fontSize:20
  }
});

export default WeeklyScheduleScreen;
