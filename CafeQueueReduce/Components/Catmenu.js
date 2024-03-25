import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

import menu from "../app/(home)/menu";
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
      <Image style={styles.img} source={item?.image} />
      <View style={styles.v1}>
        <View style={{}}>
          <Text style={styles.tname}>{item?.name}</Text>
          <Text style={styles.tdesc}>{item?.description}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default Catmenu;
const styles = StyleSheet.create({
  pres: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 0,
    backgroundColor: "white",
  },
  img: {
    height: 350,
    width: 390,
  },
  v1: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
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

});
