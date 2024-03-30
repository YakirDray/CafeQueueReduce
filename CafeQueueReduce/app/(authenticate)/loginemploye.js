import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.f_title}>הקפיטריה של סמי שמעון</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>התחברות לעובד</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="הזן אימייל"
          />
        </View>
        
        
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};