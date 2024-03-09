import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
//מסך של כניסה ויציאה ממשמרת לעובדים הכולל שעות שניות ודקות
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
};

const EmployeeShiftScreen = () => {
  const [isOnShift, setIsOnShift] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [shiftDuration, setShiftDuration] = useState(0);

  const handleShiftToggle = () => {
    if (isOnShift) {
      // Clock out
      const currentTime = new Date();
      const durationInMilliseconds = currentTime - shiftStartTime;
      const durationInSeconds = durationInMilliseconds / 1000;
      setShiftDuration(durationInSeconds);
    } else {
      // Clock in
      setShiftStartTime(new Date());
    }
    setIsOnShift(!isOnShift);
  };

  useEffect(() => {
    if (isOnShift) {
      // Update shift duration every second
      const interval = setInterval(() => {
        const currentTime = new Date();
        const durationInMilliseconds = currentTime - shiftStartTime;
        const durationInSeconds = durationInMilliseconds / 1000;
        setShiftDuration(durationInSeconds);
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [isOnShift, shiftStartTime]);

  return (
    <View style={styles.container}>
      <View style={styles.Viewtitle}>
        <Text style={styles.title}>כניסה ויציאה ממשמרת </Text>
      </View>
      <Text style={styles.header}>Employee Shift</Text>
      {isOnShift && (
        <Text style={styles.duration}>
          Shift duration: {formatTime(shiftDuration)}
        </Text>
      )}
      <TouchableOpacity style={styles.ClockButton}>
        <Text style={styles.status}>
          {isOnShift ? 'You are currently on shift' : 'You are off shift'}
        </Text>
        <Button
          title={isOnShift ? 'Clock Out' : 'Clock In'}
          onPress={handleShiftToggle}
          color="white"
        />
      </TouchableOpacity>
      <Button
        title="Back to Home"
        onPress={() => {
          // Navigate back to home screen
          // Implement navigation logic here
        }}
        color="#00BFFF" // צבע תכלת
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#00BFFF', // צבע תכלת
    padding: 15,
    color: 'white',
  },
  duration: {
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#00BFFF', // צבע תכלת
    padding: 15,
    color: 'black',
  },
  title:{
    fontSize:30,
    color:"white",
    backgroundColor:"#00BFFF",
    borderRadius:30, // עיגול כותרת
    fontWeight:"bold",
    padding: 10,
  },
  Viewtitle:{
    marginBottom:40,
    borderRadius:30, // עיגול כותרת
    overflow: 'hidden',
  },
  ClockButton:{
    marginTop: 20,
    backgroundColor: "#00BFFF", // צבע תכלת
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
});

export default EmployeeShiftScreen;
