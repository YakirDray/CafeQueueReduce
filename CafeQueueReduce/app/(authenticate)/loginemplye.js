// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // פונקציה להתחברות לעובד עם האימייל והסיסמה
//     // למשל: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
//     // ואז טיפול בתוצאה וניווט למסך הבא
//   };
 
//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken");
//         if (token) {
//           router.replace("/home");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     checkLogin();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ marginTop: 50 }}>
//         <Text style={styles.f_title}>הקפיטריה של סמי שמעון</Text>
//       </View>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>התחברות לעובד</Text>
//       </View>
//       <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
//         <View style={styles.inputView}>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             placeholder="הזן אימייל"
//           />
//         </View>
//         <View style={styles.inputView}>
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={setPassword}
//             placeholder="הזן סיסמה"
//             secureTextEntry
//           />
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button title="התחבר" onPress={handleLogin} />
//         </View>
//         <View style={styles.forgotPasswordContainer}>
//           <Button title="שכחתי סיסמא" onPress={() => console.log('Forgot password')} />
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff', // לבן
//     alignItems: 'center',
//   },
//   titleContainer: {
//     marginTop: 50,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   inputView: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
//   buttonContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   forgotPasswordContainer: {
//     width: '100%',
//   },
// });

// export default Login;
