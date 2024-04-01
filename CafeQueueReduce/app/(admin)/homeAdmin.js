import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Alert} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const homeAdmin = () => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);


  const handleLogout = async () => {
    // Display an alert to confirm logout
    Alert.alert(
      'התנתקות',
      'האם אתה בטוח שברצונך להתנתק מהחשבון שלך?',
      [
        {
          text: 'ביטול',
          style: 'cancel',
        },
        {
          text: 'כן',
          onPress: async () => {
            try {
              // מוחקים את הטוקן שמור באפליקציה (בדרך כלל השמירה המקומית של הטוקן)
              await AsyncStorage.removeItem("authToken");
              // מפנים את המשתמש לעמוד ההתחברות
              router.replace("/adminLogin");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const items = [
    {
      id: "1",
      name: "סידור עבודה"
    },
    {
      id: "2",
      name: "פתיחת כרטיס עובד",
    },
    {
      id: "3",
      name: "ניהול מלאי",
    },
    {
      id: "4",
      name: "שעות עומס"
    },
    {
      id: "5",
      name: "חוות דעת על המוצרים"
    },
    {
      id: "6",
      name: "מוצרים נמכרים ביותר"
    },
  ];

  const handleItemPress = (item) => {
    // כאן תוסיף את הניווט לעמוד הרצוי בהתאם לפריט שנבחר
    if (item.id === "1") {
        router.replace("/arrangement_table");
    } else if (item.id === "2") {
        router.replace("/addemploye");
    }
    else if (item.id === "4") {
        router.replace("/rush_hour");
    }
    // וכך הלאה לכל הפריטים הנותרים במערך
  };

  return (
    <ScrollView>
        <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        onPressIn={() => setIsPressed(true)}
       // onPressOut={() => setIsPressed(false)}
      >
        <Text style={styles.logoutText}>התנתקות</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTytle}>
            עמוד קטגוריות למנהל
          </Text>
        </View>
        <FlatList
          contentContainerStyle={styles.flatlistContainer}
          data={items}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cont}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.text}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  textTytle: {
    fontSize: 30,
  },
  title: {
    alignItems: "center",
    paddingBottom: 20,
  },
  flatlistContainer: {
    alignItems: 'stretch',
  },
  cont: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#DB7093",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    aspectRatio: 1,
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
  logoutButton: {
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "flex-end",
    
},

});

export default homeAdmin;
