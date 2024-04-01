import {StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable,} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../Supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

   useEffect(() => {
     const checkLogin = async () => {
     try {
       const token = await AsyncStorage.getItem("authToken");
        if (token) {
         router.replace("/(home)");
       }
     } catch (error) {
       console.log(error);
     }
     };

    checkLogin();
   }, []);

  const signUpWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }
    if (data) {
      const token = data?.session?.access_token;
      AsyncStorage.setItem("authToken", token);
      
     
      router.replace("/(home)");
    }
  };

  return (
    <SafeAreaView style={styles.first_view}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.f_title}>הקפיטריה של סמי שמעון</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.s_title}>התחבר</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={styles.input_view}>
            <Entypo
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.t_input}
              placeholder="enter your Email"
            />
          </View>
          <View style={styles.input_view}>
            <Feather
              style={{ marginLeft: 8 }}
              name="unlock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.t_input}
              placeholder="enter your password"
            />
          </View>
        </View>
        <View style={styles.bottom_view}>
          <Text>השאר אותי מחובר</Text>
          <Text>שכחתי סיסמא</Text>
        </View>
        <Pressable onPress={signUpWithEmail} style={styles.login}>
          <Text style={styles.login_t}>login</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/register")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.register}>לקוח חדש? לחץ להרשם</Text>
        </Pressable>
        {/* כפתור התחברות למנהלים */}
        <Pressable
          onPress={() => router.replace("/(admin)/adminLogin")} // החלף כתובת זו על פי הניתוב שלך
          style={{ marginTop: 15 }}
        >
          <Text style={styles.adminLogin}>התחברות למנהלים</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/(employee)/loginemplye")} // צריך לסדר את הכתובת!
          style={{ marginTop: 15 }}
        >
          <Text style={styles.adminLogin}>התחברות לעובדים</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  first_view: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  f_title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  s_title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "red",
  },
  input_view: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0EEEE",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  t_input: {
    color: "gray",
    marginVertical: 10, 
    width: 300,
  },
  bottom_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  login: {
    width: 200,
    backgroundColor: "#EF9995",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginTop: 50,
  },
  login_t: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  register: {
    textAlign: "center",
    color: "gray",
    fontSize: 25,
  },
  adminLogin: {
    textAlign: "center",
    color: "blue", // ניתן לשנות צבע כדי להתאים לעיצוב שלך
    fontSize: 20,
  },
});
