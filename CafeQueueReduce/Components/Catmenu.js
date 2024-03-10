import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
const Catmenu = ({ item }) => {
  const router = useRouter();
  const menu = JSON.stringify(menu);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/menu",
          params: {
            id: item.id,
            name: item.name,
            price: item.price,
            aggregate_rating: item.aggregate_rating,
          },
        })
      }
      style={styles.pres}
    >
      <Image style={styles.img} source={{ uri: item?.featured_image }} />
      <View style={styles.v1}>
        <View style={{}}>
          <Text style={styles.tname}>{item?.name}</Text>
          <Text style={styles.tdesc}>{item?.description}</Text>
          <Text style={styles.ttime}>{item?.time}</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.trating}>{item?.aggregate_rating}</Text>
          <Entypo name="star" size={24} color="white" />
        </View>
      </View>
      <View style={styles.v3} />

      <View style={styles.v4}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color="#1F75FE"
        />
      
      </View>
    </Pressable>
  );
};
export default Catmenu;
const styles = StyleSheet.create({
  pres: {
    marginHorizontal: 6,
    marginVertical: 12,
    borderRadius: 20,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    aspectRatio: 6 / 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  v1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tname: {
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  tdesc: {
    paddingHorizontal: 10,
    marginTop: 3,
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
  },
  ttime: {
    paddingHorizontal: 10,
    marginTop: 3,
    fontSize: 14,
    fontWeight: "500",
    color: "#505050",
  },
  v2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#006A4E",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 10,
    gap: 3,
  },
  trating: {
    textAlign: "center",
    color: "white",
  },
  v3: {
    borderWidth: 0.5,
    borderColor: "#C8C8C8",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  v4: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginHorizontal: 8,
    marginVertical: 5,
  },

});
