import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal,Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const BusyHoursCarousel = () => {
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
      <View style={styles.hourContainer}>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  hourContainer: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  hourText: {
    fontSize: 18,
    textAlign: 'center',
  },
  carousel: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    marginTop: 20,

    backgroundColor: '#f0f0f0',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  busyHour: {
    color: 'red',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  notBusyHour: {
    color: 'green',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 5,
  },
  busyCard: {
    backgroundColor: 'red',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  back:{
    fontSize:20
  }
});

export default BusyHoursCarousel;
