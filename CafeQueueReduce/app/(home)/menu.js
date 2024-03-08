import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList,Pressable } from 'react-native';
import { addToCart } from '../../Redux/Cart';
import {useDispatch} from 'react-redux';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
const Menu = [
  {
    category: "שתייה",
    categoryImage: require("../../assets/DRINKS.jpg"),
    item: [
      {
        id: "1",
        name: "לימונדה ביתית",
        price: 12,
        rating: 4.7,
        description: "לימונדה קרה ומרעננת, מוגשת עם קרח",
        prepTime: "5 min",
       // image: "https://example.com/lemonade.jpg", // Image for the item
      },
      {
        id: "2",
        name: "אספרסו",
        price: 10,
        rating: 4.5,
        description: "קפה אספרסו חזק ועשיר בטעמים",
        prepTime: "3 min",
       // image: "https://example.com/espresso.jpg",
      },
    ],
  },
  {
    category: "בצלחת",
    categoryImage: require("../../assets/schnitzelbaget.jpg"),
    item: [
      {
        id: "3",
        name: "שניצל עוף",
        price: 45,
        rating: 4.3,
        description: "שניצל עוף פריך מוגש עם תוספת לבחירה",
        prepTime: "15 min",
        image: require("../../assets/schnitzelbaget.jpg"), 
      },
      {
        id: "4",
        name: "סלט יווני",
        price: 38,
        rating: 4.6,
        description: "סלט יווני עשיר ומרענן עם גבינת פטה",
        prepTime: "10 min",
      //  image: "https://example.com/greek_salad.jpg",
      },
    ],
  },
  {
    category: "בגט",
   // categoryImage: "https://example.com/category_baguettes.jpg",
    item: [
      {
        id: "5",
        name: "בגט סלמון",
        price: 55,
        rating: 4.8,
        description: "בגט עם סלמון מעושן, חמאה, ועלי רוקט",
        prepTime: "10 min",
       // image: "https://example.com/salmon_bagel.jpg",
      },
      {
        id: "6",
        name: "בגט טונה",
        price: 50,
        rating: 4.4,
        description: "בגט טונה עם מיונז, בצל סגול, וחסה",
        prepTime: "10 min",
       // image: "https://example.com/tuna_bagel.jpg",
      },
    ],
  },
];
const menu = () => {
  const params = useLocalSearchParams();
 const router = useRouter();
  const dispatch = useDispatch()
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={ item.image } style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>Price:{item.price}₪</Text>
        <Text style={styles.itemPrepTime}>Prep time: {item.prepTime}</Text>
        <Pressable
      style={styles.addToCart}
      onPress={() => dispatch(addToCart(item))}
    >
      <Text style={styles.t}>Add to Cart</Text>
    </Pressable> 
      </View>
    </View>
  );
  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.category}</Text>
      <Image source={item.categoryImage } style={styles.categoryImage} />
      <FlatList
        data={item.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
       <View>
       <Pressable
      onPress={() =>
        router.push({
          pathname: "/cart",
          params: {
            id: item.id,
            name: item.name,
            price: item.price,
           
          },
        })
      }
      style={styles.pres}
    >
        <Text>Go to Cart</Text>
      </Pressable>
    </View>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={Menu}
        renderItem={renderCategory}
        keyExtractor={(item) => item.category}
      /> 
    </ScrollView>
  );
};
export default menu
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
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
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrepTime: {
    fontSize: 14,
    color: '#666',
  },
  t:{
    fontSize:20,
  }
});