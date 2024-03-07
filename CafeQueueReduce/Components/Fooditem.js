import { Pressable,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';

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
