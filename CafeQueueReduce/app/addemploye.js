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

}