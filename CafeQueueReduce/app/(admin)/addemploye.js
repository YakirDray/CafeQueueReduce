import React, { useState } from "react";
import {
  View,
  Button,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { supabase } from "../../Supabase";
import { useRouter } from "expo-router";
const AddEmployee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    id:"",
    seniority:"",
    position: "",
    phone: "",
    salary: "",

  });

  const handleSaveEmployee = async () => {
    try {
      const { data, error } = await supabase
        .from("Employee_card")
        .insert([{ data: employeeData }]);

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
        <Button
          title="להוספת כרטיס עובד חדש:"
          onPress={() => setIsModalVisible(true)}
          color="green"
        />
        <Pressable
          onPress={() => router.replace("/homeAdmin")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.back}>חזור</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
          <Text style={styles.modalTitle}>הוספת כרטיס עובד חדש</Text>

          <TextInput
            placeholder="שם העובד"
            style={styles.input}
            value={employeeData.name}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, name: text })
            }
          />
          <TextInput
            placeholder="תעודת זהות"
            style={styles.input}
            value={employeeData.id}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, id: text })
            }
          />
           <TextInput
            placeholder="ותק"
            style={styles.input}
            value={employeeData.seniority}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, seniority: text })
            }
          />
           
          <TextInput
            placeholder="תפקיד"
            style={styles.input}
            value={employeeData.position}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, position: text })
            }
          />
          <TextInput
            placeholder="מספר פלאפון"
            style={styles.input}
            value={employeeData.phone}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, phone: text })
            }
          />
          <TextInput
            placeholder="משכורת"
            style={styles.input}
            value={employeeData.salary}
            onChangeText={(text) =>
              setEmployeeData({ ...employeeData, salary: text })
            }
          />

          <TouchableOpacity onPress={handleSaveEmployee} style={styles.button}>
            <Text style={{ color: "white" }}>שמור פרטי עובד</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default AddEmployee;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  back: {
    fontSize: 25,
  },
});
