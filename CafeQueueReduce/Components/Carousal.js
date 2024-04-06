import { ScrollView, StyleSheet, View, text, Image } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
function Carousal() {
  const images = [
    require("../../CafeQueueReduce/assets/salmonbaguette.webp"),
    require("../../CafeQueueReduce/assets/teaf.webp"),
    require("../../CafeQueueReduce/assets/steak.webp"),
    require("../../CafeQueueReduce/assets/sabich.webp"),
    require("../../CafeQueueReduce/assets/weather.webp"),
    require("../../CafeQueueReduce/assets/shawarma.webp"),
    require("../../CafeQueueReduce/assets/whitechocolate.webp"),
    require("../../CafeQueueReduce/assets/schnitzel.webp"),
    require("../../CafeQueueReduce/assets/salmonfille.webp"),
    require("../../CafeQueueReduce/assets/mushroomrisotto.webp"),
    require("../../CafeQueueReduce/assets/milkshake.webp"),
    require("../../CafeQueueReduce/assets/lemonade.webp"),
    require("../../CafeQueueReduce/assets/lambburger.webp"),
    require("../../CafeQueueReduce/assets/coldcoffee.webp"),
    require("../../CafeQueueReduce/assets/greeksalad.webp"),
    require("../../CafeQueueReduce/assets/greentea.webp"),
    require("../../CafeQueueReduce/assets/gummy.webp"),
    require("../../CafeQueueReduce/assets/kebab.webp"),
  ];
  return (
    <View>
      <SliderBox
        images={images} // Pass the images array here
        autoPlay
        circleLoop
        dotColor="black"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={styles.imagecomp}
      />
    </View>
  );
}

export default Carousal;

const styles = StyleSheet.create({
  imagecomp: {
    borderRadius: 25,
    width: "97%",
    marginTop: 10,
  },
});
