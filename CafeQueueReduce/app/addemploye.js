import React, { useState } from 'react';
import { View, Button, Image, Text, ScrollView, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// לא לגעת יש לי מה להשלים פה!!

const logoImg = require("./assets/adaptive-icon.png");

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  
  const handleSaveEmployee = () => {
    // עדכון פרטי העובד כאן עם המשתנה employeeData
    console.log("Saved employee data:", employeeData);
    setIsModalVisible(false); // סגירת המודל ברגע שנשמרו הפרטים
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 60 }}>
      <ScrollView>
        <Button title='להוספת כרטיס עובד חדש:' onPress={() => setIsModalVisible(true)} color="green" />
        <Image source={logoImg} style={{ flex: 1 }} />
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



        </View>
      </Modal>
    </View>


        
  );
}
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

  