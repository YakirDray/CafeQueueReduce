import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// באמצע עבודה פה לא לשנות !
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // פונקציה להתחברות לעובד עם האימייל והסיסמה
    // למשל: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    // ואז טיפול בתוצאה וניווט למסך הבא
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);
}