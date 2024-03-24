import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet,StatusBar } from 'react-native';

const WeeklyScheduleScreen = () => {
  const [scheduleData, setScheduleData] = useState([
    { day: 'Sunday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Monday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Tuesday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Wednesday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Thursday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Friday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
    { day: 'Saturday', employees: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
  ]);

  const morningHours = ['8-9', '9-10', '10-11', '11-12', '12-13'];
  const afternoonHours = ['13-14', '14-15', '15-16', '16-17', '17-18'];
  const handleEmployeeChange = (dayIndex, employeeIndex, text) => {
    const updatedScheduleData = [...scheduleData];
    updatedScheduleData[dayIndex].employees[employeeIndex] = text;
    setScheduleData(updatedScheduleData);
  };

  return (
    <ScrollView horizontal style={{ marginVertical: 20 }}>
      <StatusBar backgroundColor="#00BFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.cell}><Text style={styles.headerText}>Hours</Text></View>
          {scheduleData.map((item, index) => (
            <View key={index} style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{item.day}</Text>
              
            </View>
          ))}
        </View>
        {morningHours.map((hour, hourIndex) => (
          <View style={styles.row} key={hourIndex}>
            <View style={[styles.cell, styles.hourCell]}><Text>{hour}</Text></View>
            {scheduleData.map((item, dayIndex) => (
              <TextInput
                key={dayIndex}
                style={[styles.cell, styles.employeeCell]}
                onChangeText={text => handleEmployeeChange(dayIndex, hourIndex, text)}
                value={scheduleData[dayIndex].employees[hourIndex]}
                placeholder="Employee"
              />
            ))}
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Afternoon Shift</Text>
        </View>
        {afternoonHours.map((hour, hourIndex) => (
          <View style={styles.row} key={hourIndex}>
            <View style={[styles.cell, styles.hourCell]}><Text>{hour}</Text></View>
            {scheduleData.map((item, dayIndex) => (
              <TextInput
                key={dayIndex}
                style={[styles.cell, styles.employeeCell]}
                onChangeText={text => handleEmployeeChange(dayIndex, hourIndex + morningHours.length, text)}
                value={scheduleData[dayIndex].employees[hourIndex + morningHours.length]}
                placeholder="Employee"
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    minWidth: '100%',
    marginVertical:30,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 20,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 80,
  },
  headerCell: {
    backgroundColor: 'green',
    borderRadius: 30,
    minWidth: 80,
  },
  headerText: {
    fontWeight: 'bold',
  },
  hourCell: {
    backgroundColor: '#00BFFF',
    width: 80,
    borderRadius: 30,
  },
  employeeCell: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#00BFFF',
    width: 80,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 2,
    borderRadius: 20,
  },
});

export default WeeklyScheduleScreen;

   
