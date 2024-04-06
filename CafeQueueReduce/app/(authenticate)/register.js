import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { supabase } from "../../Supabase";
const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signUpNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      name: name,
      email: email,
      password: password,
    });

    if (data?.user?.role == "authenticated") {
      Alert.alert("You have been successfully registered");
    }
    if (error) {
      Alert.alert("Error while registering", "please try again");
    }
  };

  return (
    <SafeAreaView style={styles.first_view}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.f_title}>הקפיטריה של סמי שמעון</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.s_title}> הרשמה</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={styles.input_view}>
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.t_input}
              placeholder="enter your Name"
            />
          </View>
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
        <View style={styles.bottom_view}></View>
        <Pressable onPress={signUpNewUser} style={styles.login}>
          <Text style={styles.login_t}>register</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/login")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.register}>קיים חשבון התחבר</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

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
    backgroundColor: "#fd5c63",
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
    fontSize: 16,
  },
});
