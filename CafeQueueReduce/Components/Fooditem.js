import { Pressable,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';
//import { test,render } from '@testing-library/react-native';//לבדיקת יחידה לא למחוק!

const FoodItem = ({item}) => {
  const data = [item];
  return (
    <View>
      <Text>idan</Text>
      {data?.map((item,index) => (
          <>
          <Pressable style={styles.itemstyle} key={index}>
              <Text style={styles.textstyle}>{item?.name} ({item?.items?.length})</Text>
              <AntDesign name="down" size={20} color="black" />
          </Pressable>

            {item?.items?.map((item,index) => (
                <MenuItem key={index} item={item}/>
            ))}
          </>
          
      ))}
    </View>

  )
}

export default FoodItem

const styles = StyleSheet.create({
 
  itemstyle: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    padding: 10, 
    borderRadius: 10,
  },
  
  textstyle:{
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  }

})
////my test
// בדיקת יחידה למקרה וקיבלנו אייטם לא תקין מהמניו שהוא מכיל לפחות טקסט
test('renders "item not received" when item prop is not passed', () => {
  const { getByText } = render(<FoodItem />);
  const textElement = getByText(/item not received/i);
  expect(textElement).toBeTruthy();
});
//AI test
//  בדיקת יחידה למקרה ולא קיבלנו אייטם תקין מהמניו
test('renders without crashing', () => {
  render(<FoodItem />);
});
// בדיקת יחידה למקרה שהקומפוננטה מציגה את כמות הפריטים ברשימת הפריטים
test('renders item quantity when item prop is passed', () => {
  const mockItem = {
    name: 'Pizza',
    items: [{ name: 'Margarita' }, { name: 'Pepperoni' }],
  };
  const { getByText } = render(<FoodItem item={mockItem} />);
  const quantityElement = getByText(`(${mockItem.items.length})`);
  expect(quantityElement).toBeTruthy();
});
// בדיקת יחידה למקרה שהקומפוננטה מציגה את שם הפריט הראשי
test('renders main item name when item prop is passed', () => {
  const mockItem = {
  name: 'Burger',
  items: [{ name: 'Cheeseburger' }, { name: 'Veggie Burger' }],
  };
  const { getByText } = render(<FoodItem item={mockItem} />);
  const nameElement = getByText(mockItem.name);
  expect(nameElement).toBeTruthy();
  });
      
  

