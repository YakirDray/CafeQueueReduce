import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure you have this installed
import { useRouter } from "expo-router";
import { supabase } from "../../Supabase"; // Import your Supabase client

const clock = () => {
  const [name, setName] = useState('');
  const [salaryPerHour, setSalaryPerHour] = useState(35);
  const [currentTime, setCurrentTime] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClockIn = async () => {
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
  };

  const handleClockOut = async () => {
    const clockOutTime = new Date().toISOString();
    let { data: clockInData, error: clockInError } = await supabase
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

    const hoursWorked = (new Date(clockOutTime) - new Date(clockInData.clock_in)) / (1000 * 60 * 60);
    const totalSalary = hoursWorked * clockInData.salary_per_hour;
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
    }
  };

  return (
    <View style={styles.container}>
      {/* Time Display and Status */}
      <Text style={styles.timeDisplay}>{currentTime}</Text>
      <Text style={styles.statusIndicator}>{status}</Text>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          onPress={handleClockIn}
          style={[styles.actionButton, styles.clockInButton]}
        >
          <Icon name="check" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClockOut}
          style={[styles.actionButton, styles.clockOutButton]}
        >
          <Icon name="times" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Field for Name (for simplicity) */}
      <TextInput
        style={styles.inputField}
        placeholder="הקלד את שמך..."
        value={name}
        onChangeText={setName}
      />

      {/* Navigate Back Button */}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  actionButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  clockInButton: {
    backgroundColor: "#32CD32", // Green color
  },
  clockOutButton: {
    backgroundColor: "#FF4500", // Red color
  },
  statusIndicator: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
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
    color: "#0000FF", // Example color
  },
});
export default clock;
