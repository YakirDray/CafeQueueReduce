import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Make sure you have this installed
import { useRouter } from "expo-router";
import { supabase } from "../../Supabase"; // Import your Supabase client

// Function to format time for convenient display
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
};

const clock = () => {
  const [isOnShift, setIsOnShift] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [shiftDuration, setShiftDuration] = useState(0);
  const [name, setName] = useState('');
  const [salaryPerHour, setSalaryPerHour] = useState(35);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleShiftToggle = async () => {
    if (isOnShift) {
      // Clock out
      const currentTime = new Date();
      const durationInMilliseconds = currentTime - shiftStartTime;
      const durationInSeconds = durationInMilliseconds / 1000;

      const clockOutTime = currentTime.toISOString();
      const { data: clockInData, error: clockInError } = await supabase
        .from('time_clock')
        .select('*')
        .eq('name', name)
        .order('clock_in', { ascending: false })
        .limit(1)
        .single();

      if (clockInError) {
        console.log('Error fetching clock-in data:', clockInError);
        setStatus('Error fetching clock-in data');
        return;
      }

      const hoursWorked = durationInSeconds / 3600; // Convert seconds to hours
      const totalSalary = hoursWorked * salaryPerHour;

      const { error } = await supabase
        .from('time_clock')
        .update({ clock_out: clockOutTime, total_salary: totalSalary })
        .eq('id', clockInData.id);

      if (error) {
        console.log('Error clocking out:', error);
        setStatus('Error clocking out');
      } else {
        setStatus('יצא');
        console.log(`Clocked out. Total salary: ${totalSalary}`);
        console.log('Employee:', name);
        console.log('Total Salary:', totalSalary);
      }

      setShiftDuration(durationInSeconds);
    } else {
      // Clock in
      setShiftStartTime(new Date());
      const clockInTime = new Date().toISOString();
      const { data, error } = await supabase
        .from('time_clock')
        .insert([
          { name, clock_in: clockInTime, salary_per_hour: salaryPerHour }
        ]);

      if (error) {
        console.log('Error clocking in:', error);
        setStatus('Error clocking in');
      } else {
        setStatus('נכנס');
        console.log('Clock in data:', data);
      }
    }
    setIsOnShift(!isOnShift);
  };

  // Update shift time every second
  useEffect(() => {
    if (isOnShift) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const durationInMilliseconds = currentTime - shiftStartTime;
        const durationInSeconds = durationInMilliseconds / 1000;
        setShiftDuration(durationInSeconds);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOnShift, shiftStartTime]);

  return (
    <View style={styles.container}>
      {/* Set the status bar color */}
      <StatusBar backgroundColor="#00BFFF" />
      
      <View style={styles.Viewtitle}>
        <Text style={styles.title}>כניסה ויציאה ממשמרת</Text>
      </View>
      <Text style={styles.header}>Employee/Manager Shift</Text>
      {isOnShift && (
        <Text style={styles.duration}>
          Shift duration: {formatTime(shiftDuration)}
        </Text>
      )}
      <TouchableOpacity style={styles.ClockButtonContainer}>
        <Button
          title={isOnShift ? 'Press to Clock Out' : 'Press to Clock In'}
          onPress={handleShiftToggle}
          color="#00BFFF"
        />
        <Text style={styles.status}>
          {isOnShift ? 'You are currently on shift' : 'You are off shift'}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.inputField}
        placeholder="הקלד את שמך..."
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        onPress={() => router.replace("/homeAdmin")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>חזור</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    textAlign: 'center',
    color: '#808080',
  },
  duration: {
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#00BFFF',
    padding: 15,
    color: 'black',
  },
  title: {
    fontSize: 30,
    color: "white",
    backgroundColor: "#00BFFF",
    borderRadius: 30,
    fontWeight: "bold",
    padding: 10,
  },
  Viewtitle: {
    marginBottom: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
  ClockButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    width: "80%",
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
  },
  backButton: {
    marginTop: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: "#0000FF",
  },
});

export default clock;
