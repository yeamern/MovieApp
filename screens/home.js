import axios from 'axios';
import { globalStyles } from '../styles/global';
import { Image, Modal, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

  const apiurl = 'http://www.omdbapi.com/?&apikey=35aceca6' 

  const [state, setState] = useState({
    input: '',
    results: [],
    selected: {} 
  })

  const search = () => {
    axios(apiurl + "&s=" + state.input).then(({ data }) => {
      let results = data.Search
      console.log(results)
      setState(prevState => {
        return {...prevState, results: results}
      })
    })
  }

  const openPopup = id => {
    axios(apiurl + '&i=' + id).then(({ data }) => {
      let movie = data;
      console.log(movie); 
      setState(prevState => {
        return{...prevState, selected: movie}
      });
    });
  }
  
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Movie Search</Text>

      <TextInput 
        placeholder='Enter movie name'
        style={globalStyles.searchBox}
        onChangeText={text => setState(prevState => {
          return {...prevState, input: text}
        })}
        onSubmitEditing={search}
        value={state.input}
      />

      <ScrollView style={globalStyles.movieList}>
        {state.results.map(movie => (
          <TouchableHighlight 
            key={movie.imdbID} 
            onPress={() => openPopup(movie.imdbID)}>
            <View key={movie.imdbID} style={globalStyles.movieList}>
              <Image 
                source={{ uri: movie.Poster}}
                style={{
                  width: '100%', 
                  height: 300
                }}
                resizeMode='cover'
              />
              <Text style={globalStyles.heading}>{movie.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal 
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined') ? true : false}>
          <View style={globalStyles.popUp}>
            <Text style={globalStyles.popTitle}> {state.selected.Title}</Text>
            <Text style={globalStyles.rating}> Rating: {state.selected.imdbRating} </Text>
            <Text style={globalStyles.plot}> {state.selected.Plot} </Text>
          </View>
          <TouchableHighlight
            onPress={() => setState(prevState => {
              return { ...prevState, selected: {} }
            })}>
              <Text style={globalStyles.closeButton}> Close </Text>
          </TouchableHighlight>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}