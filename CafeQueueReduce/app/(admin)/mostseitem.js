import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, ScrollView,Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
const Menuitems = [
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
        id: "8",
        name: "לימונדה ביתית",
        price: 12,
        rating: 4.7,
        description: "לימונדה קרה ומרעננת, מוגשת עם קרח",
        prepTime: "5 min",
        image: require("../../assets/lemonade.webp"),
      },
      {
        id: "9",
        name: "אספרסו",
        price: 10,
        rating: 4.5,
        description: "קפה אספרסו חזק ועשיר בטעמים",
        prepTime: "3 min",
        image: require("../../assets/espresoshort.jpg"),
      },
      {
        id: "10",
        name: "תה ירוק עם נענע",
        price: 8,
        rating: 4.8,
        description: "תה ירוק מרענן עם עלי נענע טריים",
        prepTime: "4 min",
        image: require("../../assets/greentea.webp"),
      },
      {
        id: "11",
        name: "שייק פירות יער",
        price: 15,
        rating: 4.9,
        description: "שייק עשיר בפירות יער טריים ובריא",
        prepTime: "5 min",
        image: require("../../assets/milkshake.webp"),
      },
      {
        id: "12",
        name: "מוקה קר",
        price: 14,
        rating: 4.6,
        description: "קפה מוקה עם חלב ושוקולד, מוגש קר",
        prepTime: "6 min",
        image: require("../../assets/coldcoffee.webp"),
      },
      {
        id: "13",
        name: "קפה שחור",
        price: 16,
        rating: 4.7,
        description: "חזק!",
        prepTime: "5 min",
        image: require("../../assets/espreso.jpg"),
      },
      {
        id: "14",
        name: "מים עם לימון ונענע",
        price: 5,
        rating: 4.9,
        description: "מים מרעננים עם פרוסות לימון ועלי נענע טריים",
        prepTime: "2 min",
        image: require("../../assets/weather.webp"),
      },
      {
        id: "15",
        name: "תה פירות יער",
        price: 7,
        rating: 4.8,
        description: "תה חם או קר עם תערובת פירות יער ותבלינים",
        prepTime: "5 min",
        image: require("../../assets/teaf.webp"),
      },
      {
        id: "16",
        name: "מיץ גזר טבעי",
        price: 12,
        rating: 4.7,
        description: "מיץ גזר טרי ומזין, מוכן במקום",
        prepTime: "4 min",
        image: require("../../assets/carrot.webp"),
      },
      {
        id: "17",
        name: "סודה ליים",
        price: 6,
        rating: 4.6,
        description: "סודה מרעננת עם טעם ליים טבעי",
        prepTime: "2 min",
        image: require("../../assets/weather.webp"),
      },
      {
        id: "18",
        name: "קפה קר",
        price: 8,
        rating: 4.5,
        description: "קפה קר מרענן, מוגש עם קרח",
        prepTime: "3 min",
        image: require("../../assets/coldcoffee.webp"),
      },
      {
        id: "19",
        name: "מיץ תפוזים טבעי",
        price: 10,
        rating: 4.8,
        description: "מיץ תפוזים סחוט טרי, מוגש קר",
        prepTime: "5 min",
        image: require("../../assets/orangejuice.webp"),
      },
      {
        id: "20",
        name: "תה קמומיל",
        price: 6,
        rating: 4.7,
        description: "תה קמומיל מרגיע ועדין, מוגש חם",
        prepTime: "4 min",
        image: require("../../assets/chamomiletea.webp"),
      },
      {
        id: "21",
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
        id: "22",
        name: "בגט שווארמה",
        price: 55,
        rating: 4.8,
        description: "בגט עם שווארמה ותוספות לבחירה ",
        prepTime: "10 min",
        image: require("../../assets/shawarma.webp"),
      },
      {
        id: "23",
        name: "בגט שניצל",
        price: 50,
        rating: 4.4,
        description: "בגט שניצל, בצל סגול, וחסה",
        prepTime: "10 min",
        image: require("../../assets/schnitzelbaget.webp"),
      },
      {
        id: "24",
        name: "פיתה סביח",
        price: 40,
        rating: 4.6,
        description: "בגט עם חציל קלוי, ביצה קשה, טחינה, סלט ישראלי, ואמבה",
        prepTime: "10 min",
        image: require("../../assets/sabich.webp"),
      },
      {
        id: "25",
        name: "פיתה קבב",
        price: 38,
        rating: 4.5,
        description: "פיתה עם קבב בקר עסיסי, חומוס, סלט ישראלי, וטחינה",
        prepTime: "12 min",
        image: require("../../assets/kebab.webp"),
      },
      {
        id: "26",
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
        id: "27",
        name: "שוקולד מריר",
        price: 5,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/darkchocolate.webp"),
      },
      {
        id: "28",
        name: "סוכריות גומי פירות",
        price: 3,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/gummy.webp"),
      },
      {
        id: "29",
        name: "בר שוקולד עם אגוזים",
        price: 7,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/chocolatenuts.webp"),
      },
      {
        id: "30",
        name: "סוכריות מנטה",
        price: 2,
        rating: 4.6,
        prepTime: "0 min",
        image: require("../../assets/darkchocolate.webp"),
      },
      {
        id: "31",
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
        id: "32",
        name: "בורקס גבינות",
        price: 12,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/burekasch.webp"),
      },
      {
        id: "33",
        name: "בורקס ביצה וגבינה",
        price: 14,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/eggburekas.webp"),
      },
      {
        id: "34",
        name: "בורקס זיתים",
        price: 10,
        rating: 4.6,
        prepTime: "0 min",
        image: require("../../assets/oliveburekas.webp"),
      },
      {
        id: "35",
        name: "בורקס גבינה וזיתים",
        price: 13,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/cheesebureka.webp"),
      },

      {
        id: "36",
        name: "בורקס תפוחי אדמה",
        price: 12,
        rating: 4.8,
        prepTime: "0 min",
        image: require("../../assets/potatoburekas.webp"),
      },
      {
        id: "37",
        name: "בורקס בולגרית",
        price: 14,
        rating: 4.7,
        prepTime: "0 min",
        image: require("../../assets/Bulgariancheese.webp"),
      },
      {
        id: "38",
        name: "בורקס תפוחי אדמה ופטריות",
        price: 16,
        rating: 4.9,
        prepTime: "0 min",
        image: require("../../assets/mushroomburekas.webp"),
      },
    ],
  },
];

const TopSellingProductsScreen = () => {
  const router=useRouter()
  const [filterQuery, setFilterQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!filterQuery.trim()) {
      return Menuitems;
    }
    return Menuitems.map(category => ({
      ...category,
      item: category.item.filter(item =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    })).filter(category => category.item.length > 0);
  }, [filterQuery, Menuitems]);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.category}</Text>
      <Image source={item.categoryImage} style={styles.categoryImage} />
      <FlatList
        data={item.item}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
          placeholder="Search menu items..."
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
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
  back:{
    fontSize:20
  }
});

export default TopSellingProductsScreen;
