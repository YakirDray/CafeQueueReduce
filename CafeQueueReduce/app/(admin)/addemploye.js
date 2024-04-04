import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, Modal, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { supabase } from "../../Supabase";

const AddEmployee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    phone: '',
    salary: '',
  });

  const handleSaveEmployee = async () => {
    try {
      // Insert employeeData as a JSON object
      const { data, error } = await supabase
        .from("employ")
        .insert([
          { data: employeeData } 
        ]);

      if (error) {
        throw error;
      }

      console.log("Saved employee data:", employeeData);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving employee data:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 60 }}>
      <ScrollView>
        <Button title='להוספת כרטיס עובד חדש:' onPress={() => setIsModalVisible(true)} color="green" />
        {/* <Image source={logoImg} style={{ flex: 1 }} /> */}
      </ScrollView>

      
      <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
          <Text style={styles.modalTitle}>הוספת כרטיס עובד חדש</Text>

          
          <TextInput
            placeholder="שם העובד"
            style={styles.input}
            value={employeeData.name}
            onChangeText={text => setEmployeeData({ ...employeeData, name: text })}
          />
          <TextInput
            placeholder="תפקיד"
            style={styles.input}
            value={employeeData.position}
            onChangeText={text => setEmployeeData({ ...employeeData, position: text })}
          />
          <TextInput
            placeholder="מספר פלאפון"
            style={styles.input}
            value={employeeData.department}
            onChangeText={text => setEmployeeData({ ...employeeData, department: text })}
          />
          <TextInput
            placeholder="משכורת"
            style={styles.input}
            value={employeeData.salary}
            onChangeText={text => setEmployeeData({ ...employeeData, salary: text })}
          />

          
          <TouchableOpacity onPress={handleSaveEmployee} style={styles.button}>
            <Text style={{ color: 'white' }}>שמור פרטי עובד</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
export default AddEmployee

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 25
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  }
});




  