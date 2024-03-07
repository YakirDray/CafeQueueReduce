import { ScrollView, StyleSheet, View,text,Image } from 'react-native';
import React from 'react';
import { SliderBox } from "react-native-image-slider-box"; // Corrected component name
import UTcarousel from '../unit_test/UTcarousel';

function Carousal() {
  const images = [
    require('../../CafeQueueReduce/assets/arabsalad.jpg'),
    require('../../CafeQueueReduce/assets/schnitzelbaget.jpg'),
    require('../../CafeQueueReduce/assets/water.jpg'),
    require('../../CafeQueueReduce/assets/SALADS.jpg'),
    require('../../CafeQueueReduce/assets/ricechicken.jpg'),
    require('../../CafeQueueReduce/assets/prigatanavim.jpg'),
    require('../../CafeQueueReduce/assets/potatoborekas.jpg'),
    require('../../CafeQueueReduce/assets/ziva.jpg'),
    require('../../CafeQueueReduce/assets/pastasalad.jpg'),
    require('../../CafeQueueReduce/assets/hafoh.jpg'),
    require('../../CafeQueueReduce/assets/espreso.jpg'),
    require('../../CafeQueueReduce/assets/espresoshort.jpg'),
    require('../../CafeQueueReduce/assets/DRINKS.jpg'),
    require('../../CafeQueueReduce/assets/croissantchocolate.jpg'),
    require('../../CafeQueueReduce/assets/borekasgvina.jpg'),
    require('../../CafeQueueReduce/assets/soda.jpg'),
    require('../../CafeQueueReduce/assets/zero.jpg'),
    require('../../CafeQueueReduce/assets/kola.jpg'),
    ];
  return (
    <View>
      
      <SliderBox
        images={images} // Pass the images array here
        autoPlay
        circleLoop
        dotColor="black"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={styles.imagecomp} />
        
    </View>
  );
}

export default Carousal;

const styles = StyleSheet.create({
  imagecomp: {
    borderRadius: 25,
    width: "97%",
    marginTop: 10,
  }
});
