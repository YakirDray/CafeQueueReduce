import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { addToCart } from "../../Redux/Cart";
import { useDispatch } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
const Menu = [
  {
    category: "בצלחת",
    categoryImage: require("../../assets/schnitzel.webp"),
    item: [
      {
        id: "1",
        name: "שניצל עוף",
        price: 45,
        rating: 4.3,
        description: "שניצל עוף פריך מוגש עם תוספת לבחירה",
        prepTime: "15 min",
        image: require("../../assets/schnitzel.webp"),
      },
      {
        id: "2",
        name: "סלט יווני",
        price: 38,
        rating: 4.6,
        description: "סלט יווני עשיר ומרענן עם גבינת פטה",
        prepTime: "10 min",
        image: require("../../assets/greeksalad.webp"),
      },
      {
        id: "3",
        name: "פילה סלמון",
        price: 52,
        rating: 4.8,
        description: "פילה סלמון על הגריל, מוגש עם ירקות קלויים",
        prepTime: "20 min",
        image: require("../../assets/salmonfille.webp"),
      },
      {
        id: "4",
        name: "סטייק עם תפוחי אדמה",
        price: 65,
        rating: 4.7,
        description: "סטייק בקר מושלם מוגש עם תפוחי אדמה אפויים",
        prepTime: "25 min",
        image: require("../../assets/steak.webp"),
      },
      {
        id: "5",
        name: "ריזוטו פטריות",
        price: 40,
        rating: 4.5,
        description: "ריזוטו פטריות עשיר עם גבינת פרמזן",
        prepTime: "22 min",
        image: require("../../assets/mushroomrisotto.webp"),
      },

      {
        id: "6",
        name: "בורגר טלה עם צ'יפס",
        price: 50,
        rating: 4.6,
        description: "בורגר טלה מוגש עם צ'יפס ביתי פריך",
        prepTime: "15 min",
        image: require("../../assets/lambburger.webp"),
      },
      {
        id: "7",
        name: "סלט קינואה וירקות",
        price: 36,
        rating: 4.7,
        description: "סלט קינואה מרענן עם ירקות עונתיים ורוטב לימון",
        prepTime: "12 min",
        image: require("../../assets/quinoa.webp"),
      },
    ],
  },
  {
    category: "שתייה",
    categoryImage: require("../../assets/teaf.webp"),
    item: [
      {
        id: "1",
        name: "לימונדה ביתית",
        price: 12,
        rating: 4.7,
        description: "לימונדה קרה ומרעננת, מוגשת עם קרח",
        prepTime: "5 min",
        image: require("../../assets/lemonade.webp"),
      },
      {
        id: "2",
        name: "אספרסו",
        price: 10,
        rating: 4.5,
        description: "קפה אספרסו חזק ועשיר בטעמים",
        prepTime: "3 min",
        image: require("../../assets/espresoshort.jpg"),
      },
      {
        id: "3",
        name: "תה ירוק עם נענע",
        price: 8,
        rating: 4.8,
        description: "תה ירוק מרענן עם עלי נענע טריים",
        prepTime: "4 min",
        image: require("../../assets/greentea.webp"),
      },
      {
        id: "4",
        name: "שייק פירות יער",
        price: 15,
        rating: 4.9,
        description: "שייק עשיר בפירות יער טריים ובריא",
        prepTime: "5 min",
        image: require("../../assets/milkshake.webp"),
      },
      {
        id: "5",
        name: "מוקה קר",
        price: 14,
        rating: 4.6,
        description: "קפה מוקה עם חלב ושוקולד, מוגש קר",
        prepTime: "6 min",
        image: require("../../assets/coldcoffee.webp"),
      },
      {
        id: "6",
        name: "קפה שחור",
        price: 16,
        rating: 4.7,
        description: "חזק!",
        prepTime: "5 min",
        image: require("../../assets/espreso.jpg"),
      },
      {
        id: "7",
        name: "מים עם לימון ונענע",
        price: 5,
        rating: 4.9,
        description: "מים מרעננים עם פרוסות לימון ועלי נענע טריים",
        prepTime: "2 min",
        image: require("../../assets/weather.webp"),
      },
      {
        id: "8",
        name: "תה פירות יער",
        price: 7,
        rating: 4.8,
        description: "תה חם או קר עם תערובת פירות יער ותבלינים",
        prepTime: "5 min",
        image: require("../../assets/teaf.webp"),
      },
      {
        id: "9",
        name: "מיץ גזר טבעי",
        price: 12,
        rating: 4.7,
        description: "מיץ גזר טרי ומזין, מוכן במקום",
        prepTime: "4 min",
        image: require("../../assets/carrot.webp"),
      },
      {
        id: "10",
        name: "סודה ליים",
        price: 6,
        rating: 4.6,
        description: "סודה מרעננת עם טעם ליים טבעי",
        prepTime: "2 min",
        image: require("../../assets/weather.webp"),
      },
      {
        id: "11",
        name: "קפה קר",
        price: 8,
        rating: 4.5,
        description: "קפה קר מרענן, מוגש עם קרח",
        prepTime: "3 min",
        image: require("../../assets/coldcoffee.webp"),
      },
      {
        id: "12",
        name: "מיץ תפוזים טבעי",
        price: 10,
        rating: 4.8,
        description: "מיץ תפוזים סחוט טרי, מוגש קר",
        prepTime: "5 min",
        image: require("../../assets/orangejuice.webp"),
      },
      {
        id: "13",
        name: "תה קמומיל",
        price: 6,
        rating: 4.7,
        description: "תה קמומיל מרגיע ועדין, מוגש חם",
        prepTime: "4 min",
        image: require("../../assets/chamomiletea.webp"),
      },
      {
        id: "14",
        name: "שייק וניל",
        price: 14,
        rating: 4.6,
        description: "שייק וניל קרמי עם גלידת וניל וחלב",
        prepTime: "5 min",
        image: require("../../assets/milkshake.webp"),
      },
    ],
  },
  {
    category: "פיתה,בגט",
    categoryImage: require("../../assets/salmonbaguette.webp"),
    item: [
      {
        id: "1",
        name: "בגט שווארמה",
        price: 55,
        rating: 4.8,
        description: "בגט עם שווארמה ותוספות לבחירה ",
        prepTime: "10 min",
        image: require("../../assets/shawarma.webp"),
      },
      {
        id: "2",
        name: "בגט שניצל",
        price: 50,
        rating: 4.4,
        description: "בגט שניצל, בצל סגול, וחסה",
        prepTime: "10 min",
        image: require("../../assets/schnitzelbaget.webp"),
      },
      {
        id: "6",
        name: "פיתה סביח",
        price: 40,
        rating: 4.6,
        description: "בגט עם חציל קלוי, ביצה קשה, טחינה, סלט ישראלי, ואמבה",
        prepTime: "10 min",
        image: require("../../assets/sabich.webp"),
      },
      {
        id: "7",
        name: "פיתה קבב",
        price: 38,
        rating: 4.5,
        description: "פיתה עם קבב בקר עסיסי, חומוס, סלט ישראלי, וטחינה",
        prepTime: "12 min",
        image: require("../../assets/kebab.webp"),
      },
      {
        id: "8",
        name: "בגט סלמון",
        price: 60,
        rating: 4.7,
        description:
          "בגט עם סלמון מעושן, קרם גבינה, עגבניות מיובשות, ובצל ירוק",
        prepTime: "10 min",
        image: require("../../assets/salmonbaguette.webp"),
      },
    ],
  },
  {
    category: "חטיפים",
    categoryImage: require("../../assets/Doritos.webp"),
    item: [
      {
        id: "1",
        name: "שוקולד מריר",
        price: 5,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/darkchocolate.webp"),
      },
      {
        id: "2",
        name: "סוכריות גומי פירות",
        price: 3,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/gummy.webp"),
      },
      {
        id: "3",
        name: "בר שוקולד עם אגוזים",
        price: 7,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/chocolatenuts.webp"),
      },
      {
        id: "4",
        name: "סוכריות מנטה",
        price: 2,
        rating: 4.6,
        prepTime: "0 min",
        image: require("../../assets/darkchocolate.webp"),
      },
      {
        id: "5",
        name: "שוקולד לבן",
        price: 5,
        rating: 4.5,
        prepTime: "0 min",
        image: require("../../assets/whitechocolate.webp"),
      },
    ],
  },
  {
    category: "בורקסים",
    categoryImage: require("../../assets/Bulgariancheese.webp"),
    item: [
      {
        id: "1",
        name: "בורקס גבינות",
        price: 12,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/burekasch.webp"),
      },
      {
        id: "2",
        name: "בורקס ביצה וגבינה",
        price: 14,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/eggburekas.webp"),
      },
      {
        id: "3",
        name: "בורקס זיתים",
        price: 10,
        rating: 4.6,
        prepTime: "0 min",
        image: require("../../assets/oliveburekas.webp"),
      },
      {
        id: "4",
        name: "בורקס גבינה וזיתים",
        price: 13,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/cheesebureka.webp"),
      },

      {
        id: "5",
        name: "בורקס תפוחי אדמה",
        price: 12,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/potatoburekas.webp"),
      },
      {
        id: "6",
        name: "בורקס בולגרית",
        price: 14,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/Bulgariancheese.webp"),
      },
      {
        id: "7",
        name: "בורקס תפוחי אדמה ופטריות",
        price: 16,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/mushroomburekas.webp"),
      },
    ],
  },
];
const menu = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
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
      <Image source={item.categoryImage} style={styles.categoryImage} />
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
        >
          <Text style={{ fontSize: 25 }}>Cart</Text>
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
export default menu;
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
  t: {
    fontSize: 20,
  },
});
