import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TopSellingProductsScreen = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    // קריאה לשרת או למקור נתונים כדי לקבל את המוצרים המכרים ביותר
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/top-selling-products');
        const data = await response.json();
        setTopSellingProducts(data);
      } catch (error) {
        console.error('Error fetching top selling products:', error);
      }
    };

    fetchTopSellingProducts();
  }, []);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מוצרים המכרים ביותר</Text>
      <FlatList
        data={topSellingProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TopSellingProductsScreen;
