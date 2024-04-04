import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal,Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const rush_hour = () => {
  const router =useRouter();
  const [busyHours, setBusyHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null); // השעה שנבחרה
  const [isModalVisible, setIsModalVisible] = useState(false); // האם המודל פתוח

  useEffect(() => {
    const generateBusyHours = () => {
      const staticBusyHours = [];
      for (let i = 8; i <= 18; i++) {
        staticBusyHours.push({ hour: i, count: Math.floor(Math.random() * 20) });
      }
      return staticBusyHours;
    };

    const staticBusyHours = generateBusyHours();
    setBusyHours(staticBusyHours);
  }, []);

  const openModal = (hour) => {
    setSelectedHour(hour);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedHour(null);
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} key={item.hour}>
      <View style={styles.clockFace}>
        <Text style={[styles.hourText, item.count > 10 ? styles.busyHour : styles.notBusyHour]}>
          {item.hour}:00 - {item.count} לקוחות
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
      <Pressable
          onPress={() => router.replace("/homeAdmin")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.back}>חזור</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>שעות עומס במהלך היום:</Text>
      <ScrollView >
        <View style={styles.carousel}>
          {busyHours.map((hour) => (
            <TouchableOpacity key={hour.hour} onPress={() => openModal(hour)} style={[styles.card, hour.count > 10 ? styles.busyCard : null]}>
              <Text style={styles.cardTitle}>{hour.hour}:00</Text>
              <Text style={styles.cardContent}>{hour.count} לקוחות</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedHour && `שעת ההזמנה: ${selectedHour.hour}:00`}</Text>
            <Text style={styles.modalText}>{selectedHour && `מספר הלקוחות: ${selectedHour.count}`}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>סגור</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Soft background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  clockFace: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#fff', // White background for the clock face
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000", // Adding shadow for a slight depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  hourMark: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourText: {
    color: '#333', // Dark color for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff', // Bright accent color for the close button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  back: {
    fontSize: 20,
    color: '#007bff', // Matching the close button for consistency
    padding: 10, // Ensuring touchable area is large enough
  },
  // New styles for progress bar or rings around the clock face
  progressRing: {
    position: 'absolute',
    borderRadius: 150,
  },
  busyIndicator: {
    // Styles for indicating busyness on the clock face
    height: 4,
    backgroundColor: '#ff4500', // Use a color that stands out
    borderRadius: 2,
  },
});


export default rush_hour;
