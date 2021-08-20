import { globalStyles } from '../styles/global';
import { Button, Text, View } from 'react-native';
import React from 'react';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Search');
  }

  return(
    <View style={globalStyles.homeContainer}>
        <Text style={globalStyles.title}>Movies</Text>
        <Button 
          title='search for movies'
          onPress={pressHandler}  
        />
    </View>
    )
}