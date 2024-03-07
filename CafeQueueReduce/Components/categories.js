import React, { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";
import {test ,render, fireEvent } from "@testing-library/react-native";


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
      name: "מאפים",
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
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item?.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setModalVisible(false);
        }}
        
      >
        <ScrollView>
          <View>
            <Text style={styles.modalText}>{selectedItem?.name}</Text> 
          </View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>{selectedItem?.name}</Text> */}
            {/* Add content related to the specific category */}
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#DB7093" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>חזור לקטגוריות</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, 
  },
  cont: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10, 
    backgroundColor: "#DB7093",
    borderRadius: 10,  
    justifyContent: "center",
    alignItems: "center", 
  },
  image: {
    width: 50, 
    height: 50,
    marginBottom: 5,  
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    
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
      height: 0,
    },
    shadowRadius: 4,
    
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
    fontSize:17,
  },
  modalText: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Arial", // סוג הפונט
    fontWeight: "bold",
    color: "black",
    padding: 20, // מרווח פנימי לטקסט
    borderRadius: 10, // רינועי פינה
    borderWidth: 2, // עובי קו המסגרת
    borderColor: "#FFFFFF", // צבע קו המסגרת
  },

});
//AI בדיקת יחידה בלי רכיב 
// בדיקה שבעזרתה נבדוק שכאשר לוחצים על כפתור "חזור לקטגוריות", המודל ייסגר ונחזור למסך הקטגוריות
test("pressing 'Back to Categories' button should close the modal and return to categories screen", async () => {
  // נכין את הרכיב לבדיקה
  const { getByText, queryByText } = render(<Categories />);
  
  // בדיקה 1: בדיקה כי כאשר לוחצים על קטגוריה, המודל נפתח
  fireEvent.press(getByText("מנות עיקריות"));
  expect(queryByText("מנות עיקריות")).toBeTruthy(); // אימות שהמודל נפתח

  // בדיקה 2: בדיקה כי לאחר לחיצה על כפתור "חזור לקטגוריות", המודל נסגר
  fireEvent.press(getByText("חזור לקטגוריות"));
  expect(queryByText("מנות עיקריות")).toBeFalsy(); // אימות שהמודל נסגר
});

//בדיקת 3: בדיקת נגישות: נבדוק שהרכיב נגיש ופועל כראוי במגוון מצבי שימוש, לדוגמה האם הכפתורים ניתנים ללחיצה, האם הרשימה עוברת גלילה כראוי,ה
test("component accessibility", async () => {
  // נכין את הרכיב לבדיקה
  const { getByText, getByTestId } = render(<Categories />);
  
  // בדיקה כי הכפתורים ניתנים ללחיצה
  const categoryButtons = ["מנות עיקריות", "קפה מכל הסוגים", "מאפים", "שתייה קרה", "מבצעים", "הפסקות איסוף אוכל"];
  categoryButtons.forEach((buttonText) => {
    expect(getByText(buttonText)).toBeTruthy(); // מוודא שהכפתור קיים
    fireEvent.press(getByText(buttonText)); // לוחץ על הכפתור
  });

  // בדיקה 4: בדיקה כי הרשימה עוברת גלילה כראוי
  const flatList = getByTestId("categoriesList");
  expect(flatList.props.horizontal).toBe(true); // מוודא שהרשימה נוצרת באופן אופקי
});


