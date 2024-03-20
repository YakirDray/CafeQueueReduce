import React, { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";
//import {test ,render, fireEvent } from "@testing-library/react-native";
//קריאה לקובץ בדיקות היחידה
import Categories from './categories.test'
//פונקציית קטגוריות 
const Categories = () => {
  //מצבים של החלוניות כרגע על מצב 0 במידה ומשתמש לוחץ הופך ל-1
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //מערך של טיפוסים מסוג items לכל טיפוס יש שדה של מספר מזהה ושם
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
    //פונקציה שמקבלת כפרמטר את טיפוס מוצר הפונקציה משנה את המשתנה selecteditem 
    //לאותו מוצר שנלחץ על ידי המשתמש ומשנה את המודל ל-1 מה שגורם לחלונית להיפת בעת לחיצה
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
          //פעולה שמאפשרת לחיצה כאן מתבצעת קריאה לפונקציה handleItemPress אליה שולחים את 
          //המוצר הספציפי שנלחץ והפונקציה פותחת חלונית
          
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
      //עיצוב ויצירת חלונית שנפתחת בעת לחיצה על קטגוריה מהסרגל
        animationType="slide"//אינמציה של הופעת החלונית כשנפתחת
        visible={modalVisible}//const [modalVisible, setModalVisible] = useState(false); מגיב לפי הערך המוחזר מכאן
        presentationStyle="fullScreen"//תצוגת החלונית בסך מלא
        onRequestClose={() => {//באייפון כאשר המתשמש מחליק עם היד את החלונית אז נשנה את הופעת החלונית ל-0
          setModalVisible(false);
        }}

      >
        
        <ScrollView>

          <View>
            <Text style={styles.modalText}>{selectedItem?.name}</Text> //
          </View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
     
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

