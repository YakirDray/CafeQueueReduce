import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
const High = [
  {
    category: "בצלחת",
    categoryImage: require("../../assets/schnitzel.webp"),
    item: [
      {
        id: "3",
        name: "פילה סלמון",
        price: 52,
        rating: 4.8,
        image: require("../../assets/salmonfille.webp"),
      },
      {
        id: "4",
        name: "סטייק עם תפוחי אדמה",
        price: 65,
        rating: 4.7,
        image: require("../../assets/steak.webp"),
      },
      {
        id: "7",
        name: "סלט קינואה וירקות",
        price: 36,
        rating: 4.7,
        image: require("../../assets/quinoa.webp"),
      },
    ],
  },
  {
    category: "שתייה",
    categoryImage: require("../../assets/teaf.webp"),
    item: [
      {
        id: "11",
        name: "שייק פירות יער",
        price: 15,
        rating: 4.9,
        image: require("../../assets/milkshake.webp"),
      },
      {
        id: "10",
        name: "תה ירוק עם נענע",
        price: 8,
        rating: 4.8,
        image: require("../../assets/greentea.webp"),
      },
      {
        id: "19",
        name: "מיץ תפוזים טבעי",
        price: 10,
        rating: 4.8,
        image: require("../../assets/orangejuice.webp"),
      },
    ],
  },
  {
    category: "פיתה,בגט",
    categoryImage: require("../../assets/salmonbaguette.webp"),
    item: [
      {
        id: "22",
        name: "בגט שווארמה",
        price: 55,
        rating: 4.8,
        image: require("../../assets/shawarma.webp"),
      },
      {
        id: "26",
        name: "בגט סלמון",
        price: 60,
        rating: 4.7,
        image: require("../../assets/salmonbaguette.webp"),
      },
      {
        id: "24",
        name: "פיתה סביח",
        price: 40,
        rating: 4.6,
        image: require("../../assets/sabich.webp"),
      },
    ],
  },
  {
    category: "חטיפים",
    categoryImage: require("../../assets/Doritos.webp"),
    item: [
      {
        id: "29",
        name: "בר שוקולד עם אגוזים",
        price: 7,
        rating: 4.9,
        image: require("../../assets/chocolatenuts.webp"),
      },
      {
        id: "27",
        name: "שוקולד מריר",
        price: 5,
        rating: 4.8,
        image: require("../../assets/darkchocolate.webp"),
      },
      {
        id: "28",
        name: "סוכריות גומי פירות",
        price: 3,
        rating: 4.7,
        image: require("../../assets/gummy.webp"),
      },
    ],
  },
  {
    category: "בורקסים",
    categoryImage: require("../../assets/Bulgariancheese.webp"),
    item: [
      {
        id: "35",
        name: "בורקס גבינה וזיתים",
        price: 13,
        rating: 4.9,
        image: require("../../assets/cheesebureka.webp"),
      },
      {
        id: "38",
        name: "בורקס תפוחי אדמה ופטריות",
        price: 16,
        rating: 4.9,
        image: require("../../assets/mushroomburekas.webp"),
      },
      {
        id: "32",
        name: "בורקס גבינות",
        price: 12,
        rating: 4.8,
        image: require("../../assets/burekasch.webp"),
      },
    ],
  },
];

const TopSellingProductsScreen = () => {
  const router = useRouter();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!filterQuery.trim()) {
      return High;
    }
    return High.map((category) => ({
      ...category,
      item: category.item.filter((item) =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    })).filter((category) => category.item.length > 0);
  }, [filterQuery, High]);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.category}</Text>
      <Image source={item.categoryImage} style={styles.categoryImage} />
      <FlatList
        data={item.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>Price: {item.price}₪</Text>
        <Text style={styles.itemPrepTime}>Prep time: {item.prepTime}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Hige items..."
          value={filterQuery}
          onChangeText={setFilterQuery}
          style={styles.searchBarInput}
        />
        <AntDesign name="search1" size={24} color="blue" />
      </View>
      <View>
        <Pressable
          onPress={() => router.replace("/homeAdmin")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.back}>חזור</Text>
        </Pressable>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderCategory}
        keyExtractor={(item, index) => item.category + index}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    padding: 8,
    borderRadius: 10,
    margin: 10,
  },
  searchBarInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  categoryImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemPrepTime: {
    fontSize: 14,
    color: "#666",
  },
  back: {
    fontSize: 20,
  },
});

export default TopSellingProductsScreen;
