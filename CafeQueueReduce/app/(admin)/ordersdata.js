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
} from "react-native";
import { supabase } from "../../Supabase";
import {  useRouter } from "expo-router";

const OrdersData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    Product: "",
    serial: "",
    quantity: "",
    date: "",
  });

  const handleSaveOrder = async () => {
    try {
      console.log("Preparing to save:", orderData); // Verify the data structure

      // Save to Supabase
      const { error } = await supabase
        .from("Inventory_management")
        .insert([
          {
            Product: orderData.Product,
            serial: orderData.serial,
            quantity: orderData.quantity,
            date: orderData.date,
            data: {orderData},
          },
        ]);
      if (error) {
        throw error;
      } 

      console.log("Saved order data to Supabase:", orderData);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving order data:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 60 }}>
      <ScrollView>
        <Button
          title="להוספת דוח הזמנות מלאי :"
          onPress={() => setIsModalVisible(true)}
          color="green"
        />
        <TouchableOpacity
          onPress={() => router.replace("HomeAdmin")}
          style={styles.button}
        >
          <Text style={styles.back}>חזור</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
          <Text style={styles.modalTitle}>הוספת דוח הזמנות מלאי</Text>

          <TextInput
            placeholder="שם המוצר"
            style={styles.input}
            value={orderData.Product}
            onChangeText={(text) =>
              setOrderData({ ...orderData, Product: text })
            }
          />
          <TextInput
            placeholder="מקט"
            style={styles.input}
            value={orderData.serial}
            onChangeText={(text) =>
              setOrderData({ ...orderData, serial: text })
            }
          />
          <TextInput
            placeholder="כמות להזמנה"
            style={styles.input}
            value={orderData.quantity}
            onChangeText={(text) =>
              setOrderData({ ...orderData, quantity: text })
            }
          />
          <TextInput
            placeholder="תאריך להזמנה"
            style={styles.input}
            value={orderData.date}
            onChangeText={(text) => setOrderData({ ...orderData, date: text })}
          />

          <TouchableOpacity onPress={handleSaveOrder} style={styles.button}>
            <Text style={{ color: "white" }}>שמור פרטי מלאי</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default OrdersData;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    color: "white",
  },
});
