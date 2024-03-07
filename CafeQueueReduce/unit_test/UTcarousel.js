import { ScrollView, StyleSheet, View,text,Image } from 'react-native';
import React from 'react';
import { SliderBox } from "react-native-image-slider-box"; // Corrected component name
import { shallow,describe } from 'enzyme';

describe('Carousal component', () => { 
  it('should render ScrollView component', () => {//מוודא שהוא מכניס את הקומפוננט של סקרול ויו מפייל אינדקס ששם מחליט אם נוכל לגולל למטה במסך
    const wrapper = shallow(<Carousal />);
    expect(wrapper.find(ScrollView).exists()).toBe(true);
  });//ai

  it('should render correct number of images', () => {//מוודא שאין חריגה במערך התמונות המוצגות בקרוסלה.
    const wrapper = shallow(<Carousal />);
    const images = wrapper.find(Image);
    expect(images.length).toBe(18); // Adjust the number based on your images array
  });//ai

  it('should render images with correct sources', () => {//למקרה והקוד קורא לתמונה בטעות ממקום לא נכון או טעות באחד האותיות
    const wrapper = shallow(<Carousal />);
    const images = wrapper.find(Image);
    images.forEach((image, index) => {
      const source = image.prop('source');
      expect(source.uri).toBe(`../../CafeQueueReduce/assets/image${index + 1}.jpg`);
    });
  });//ai



  it('should pass correct props to SliderBox', () => {//מוודא שהקובץ של התמונה שנכנס לslider box בוודאות מוקם בקובץ תמונות של assets.
    const wrapper = shallow(<Carousal />);
    const sliderBox = wrapper.find(SliderBox);
    expect(sliderBox.prop('images')).toEqual([
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
    ]);//ofek
  });
});