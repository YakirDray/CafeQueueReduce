import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../Components/Carousal";
import Categories from "../../Components/categories";
import Catmenu from "../../Components/Catmenu";
import { useSelector } from "react-redux";
import { supabase } from "../../Supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const recommended = [
  {
    id: 0,
    name: "המובילים",
    image: require("../../assets/steak.webp"),
    time: "35 - 45",
    type: "",
  },
  {
    id: 1,
    name: "בוקר טוב",
    image: require("../../assets/teaf.webp"),
    time: "10 - 25",
    type: "",
  },
];

const items = [
  {
    id: "1",
    name: "סוגיי הקפה שלנו",
    description: "Across Sami-Shamoon",
    image: require("../../assets/espreso.jpg"),
  },
  {
    id: 2,
    name: "בגטים",
    description: "מבחר בשרים בבגט בתוספת ציפס ",
    image: require("../../assets/shawarma.webp"),
    type: "",
  },
  {
    id: 3,
    name: "פיתות",
    description: "מבחר מאכלים בפיתה בליווי טחינה ותוספת",
    image: require("../../assets/sabich.webp"),
    type: "",
  },
  {
    id: 4,
    name: "מתוקים",
    description: "סוכריות גומי שוקולדים חטיפים חטיפי אנרגיה וכו.....",
    image: require("../../assets/gummy.webp"),
    type: "",
  },
];

const firstimpress = [
  {
    id: "0",
    name: "הזמנה מוקדמת",
    description: "הנחות מרשימות למזמינים מראש",
    image: require("../../assets/steak.webp"),
  },
];

const Index = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const [data, setData] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("menu").select("*");
        console.log("Data:", data);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  // כתיבת הפונקציה של התנתקות והקישור לעמוד התחברות
  const handleLogout = async () => {
    try {
      // מוחקים את הטוקן שמור באפליקציה (בדרך כלל השמירה המקומית של הטוקן)
      await AsyncStorage.removeItem("authToken");
      // מפנים את המשתמש לעמוד ההתחברות
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const itemToRender = useMemo(() => {
    if (!filterQuery) return firstimpress;
    return firstimpress.filter((item) => item.name.toLowerCase().includes(filterQuery.toLowerCase()));
  }, [filterQuery, firstimpress]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        onPressIn={() => setIsPressed(true)}
       // onPressOut={() => setIsPressed(false)}
      >
        <Text style={styles.logoutText}>התנתקות</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="restaurant-outline" size={24} color="#ffe4b5" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "200" }}>אפליקצית ההזמנות של קפיטריית סמי שמעון</Text>
          <Text style={{ color: "#E52850", fontSize: 16, marginTop: 3 }}>הזמן מהר ולהרצאה לא תאחר</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <TextInput placeholder="Welcome to the cafeteria of Sami Shamoon College" value={filterQuery} onChangeText={setFilterQuery} style={{ flex: 1 }} />
        <AntDesign name="search1" size={24} color="blue" />
      </View>

      <Carousel />
      <Categories />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View style={styles.recommendedItem} key={index}>
            <View>
              <Image style={styles.image} source={item?.image} />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={styles.itemName}>{item?.name}</Text>
              <Text style={styles.itemType}>{item?.type}</Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Ionicons name="time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.categoriesText}>קטגוריות</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image style={{ width: 50, height: 50 }} source={item?.image} />
            <Text style={styles.itemName}>{item?.name}</Text>
            <Text style={styles.itemDescription}>{item?.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.toMenu}>למעבר לתפריט</Text>

      <View style={{ marginHorizontal: 8 }}>
        {itemToRender?.map((item, index) => (
          <Catmenu key={index} item={item} />
        ))}
      </View>

      <View style={{ marginHorizontal: 1 }}>
        {data?.map((item, index) => (
          <Menu key={index} item={item} firstimpress={item?.firstimpress} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
    padding: 10,
  },
  p1: {
    backgroundColor: "#6CB4EE",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 11,
    marginTop: 10,
    marginHorizontal: 10,
  },
  recommendedItem: {
    backgroundColor: "white",
    flexDirection: "row",
    margin: 2,
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 7,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "500",
  },
  itemType: {
    flex: 1,
    marginTop: 3,
    color: "gray",
    fontWeight: "500",
  },
  categoriesText: {
    textAlign: "center",
    marginTop: 7,
    letterSpacing: 4,
    marginBottom: 5,
    color: "gray",
  },
  categoryItem: {
    width: 90,
    borderColor: "#ffe4b5",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemDescription: {
    fontSize: 12,
    color: "gray",
    marginTop: 3,
  },
  toMenu: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  pressed: {
    backgroundColor: "grey",
    borderWidth: 2,
    borderColor: "black",
  },
  pressedAnimation: {
    transform: [{ scale: 1.1 }], // הגדלת הכפתור
  },
});
