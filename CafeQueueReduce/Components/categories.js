import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Categories = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      id: "1",
      name: "מנות עיקריות"
    },
    {
      id: "2",
      name: "קפה מכל הסוגים",
    },
    {
      id: "3",
      name: "מאפים"
    },
    {
      id: "4",
      name: "שתייה קרה"
    },

    {
      id: "5",
      name: "מבצעים",
    },
    {
      id: "6",
      name: "הפסקות איסוף אוכל",
    },
  ];

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginTop: 5 }}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.cont}>
              <Text style={styles.text}>{item?.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedItem?.name}</Text>
            {/* Add content related to the specific category */}
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, // או כל ערך שתרצה, כדי להזיז את הלחצנים למטה
  },
  cont: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10, // שינוי בפדינג לכפתורים
    backgroundColor: "#DB7093",
    borderRadius: 10, // שינוי בעיגוליות הכפתורים
    justifyContent: "center", // למרכז את הטקסט בכפתור
    alignItems: "center", // למרכז את הטקסט בכפתור
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    marginTop: 20, // שינוי במרווח שמעל הכפתור
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 15, // שינוי בפדינג של הכפתור
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
