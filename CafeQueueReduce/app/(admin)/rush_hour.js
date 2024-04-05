import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../Supabase';
const RushHour = () => {
  const router = useRouter();
  const [busyHours, setBusyHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null); // Selected hour
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  useEffect(() => {
    const generateBusyHours = () => {
      const staticBusyHours = [];
      for (let i = 8; i <= 18; i++) {
        staticBusyHours.push({ hour: i, count: Math.floor(Math.random() * 20) });
      }
      saveBusyHoursToSupabase(staticBusyHours)
      return staticBusyHours;

    };

    setBusyHours(generateBusyHours());
  }, []);

  const openModal = (hour) => {
    setSelectedHour(hour);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedHour(null);
    setIsModalVisible(false);
  };
  const saveBusyHoursToSupabase = async (busyHours) => {
    try {
      const {  error } = await supabase
        .from('RushHour')
        .insert([
          { date: new Date().toISOString().split('T')[0], Hour_data: busyHours },
        ]);
  
      if (error) {
        throw error;
      }
  
      console.log('Data saved successfully:', busyHours);
      alert('Busy hours saved successfully!');
    } catch (error) {
      console.error('Error saving busy hours:', error.message);
      alert('Failed to save busy hours.');
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace("/homeAdmin")} style={{ marginTop: 15 }}>
        <Text style={styles.back}>חזור</Text>
      </Pressable>
      <Text style={styles.title}>שעות עומס במהלך היום:</Text>
      <ScrollView>
        <View style={styles.carousel}>
          {busyHours.map((hour) => (
            <TouchableOpacity key={hour.hour} onPress={() => openModal(hour)} style={[styles.card, { opacity: hour.count / 20 }]}>
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjusted for content alignment
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  carousel: {
    width: '100%', // Ensure carousel takes full container width
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center items for better visual alignment
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: '45%', // Adjust card width for better grid appearance
    alignItems: 'center', // Center text and content within the card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0275d8', // Use a theme color for titles
  },
  cardContent: {
    fontSize: 16,
    color: '#666', // Slightly muted text for content
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed background for better focus on modal
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center', // Center modal content
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
  },
  closeButton: {
    backgroundColor: '#0275d8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  back: {
    fontSize: 18,
    color: '#0275d8',
    alignSelf: 'flex-start', // Align 'Back' to the start of its container
    marginLeft: 10, // Provide some margin from the edge
  },
});


export default RushHour;
