import axios from 'axios';
import { globalStyles } from '../styles/global';
import { Button, FlatList, Image, Modal, ScrollView, Text, TextInput, ToastAndroid, 
  TouchableHighlight, TouchableOpacity,  View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';  

import firebase from 'firebase/app';
import 'firebase/firestore';


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCV-y16XWVgE7nnbSlbIIUfTre2isg51e0",
  authDomain: "movie-14e8e.firebaseapp.com",
  projectId: "movie-14e8e",
  storageBucket: "movie-14e8e.appspot.com",
  messagingSenderId: "294830313548",
  appId: "1:294830313548:web:31ac466a8ad421f1ff24e9",
  measurementId: "G-EZJJNGQ7P2"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
} 

var db = firebase.firestore();


export default function Search({ navigation }) {

  const apiurl = 'http://www.omdbapi.com/?&apikey=35aceca6'

  const [historyListVisible, setHistoryListVisible] = useState(true);

  const [state, setState] = useState({
    input: '',
    results: [],
    selected: {} 
  });

  const [searchHistory, setSearchHistory] = useState([])

  // Retrieve movie from firestore
  useEffect(() => {
    db.collection('search')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
          var historyList = []
          querySnapshot.forEach((doc) => {
            historyList.push( {...doc.data(), id: doc.id} )
          });
          historyList.sort((a, b) => {return(b - a)});
          setSearchHistory(historyList);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  });

  // Search movie from firestore
  const search = () => {

    axios(apiurl + "&s=" + state.input).then(({ data }) => {
      if (data.Search) {
        let results = data.Search
        setState(prevState => {
          return {...prevState, results: results}
        })
        setHistoryListVisible(false);   
      } else {
        ToastAndroid.show(
          "Movie not found",
          ToastAndroid.LONG,
        );
      }
    });

    if (state.input != '') {
      db.collection('search')
      .add({ 
        term: state.input,
        createdAt: Date.now()
      });
    }

    console.log(state.input);

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

  const pressHandler = () => {
    navigation.navigate('Home');
  }

  const removeSearchHistory = (id) => {
    db.collection('search').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
     }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
  
  const clickHistory = (movieName) => {
    console.log(movieName);
    setState(prevState => {
      return {...prevState, input: movieName}
    });
    
    search()
  }

  return (  
    <View style={globalStyles.searchContainer}> 

      {/* Header with back button and search bar */}
      <View style={globalStyles.searchHeader}>
        <TouchableOpacity onPress={() => pressHandler()} style={globalStyles.backButton}>
          <Image source={require('../assets/arrow-left.png')}/>
        </TouchableOpacity>

        <TextInput 
          placeholder='Enter movie name'
          style={globalStyles.searchBox}
          onChangeText={text => setState(prevState => {
            return {...prevState, input: text}
          })}
          onSubmitEditing={search}
          value={state.input}
        />
      </View> 

      {/* List showing history  */}
      {
        historyListVisible ? 
          <FlatList 
            data={searchHistory} 
            renderItem={({ item }) => ( 
              <View style={globalStyles.list}>
                <TouchableOpacity onPress={() => clickHistory(item.term)} style={globalStyles.list}>
                  <Image style={globalStyles.icon} source={require('../assets/clock.png')} />  
                  <Text style={globalStyles.font}>{item.term}</Text>
                  <TouchableOpacity 
                    onPress={() => removeSearchHistory(item.id)} style={globalStyles.removeSearchHistory}>
                      <Image source={require('../assets/delete.png')}/>
                  </TouchableOpacity>
                </TouchableOpacity>

              </View>
            )}  
          /> 
          :           
          // List of movies after movie is searched 
          <ScrollView style={globalStyles.movieList}>
            {state.results.map(movie => (
              <TouchableHighlight 
                key={movie.imdbID} 
                onPress={() => openPopup(movie.imdbID)}>
                <View key={movie.imdbID} style={globalStyles.list}>
                  <Image style={globalStyles.icon} source={require('../assets/search.png')} />
                  <Text style={globalStyles.font}>
                      {movie.Title}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
      }

      {/* Pop up that show movie's details */}
      <Modal 
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined') ? true : false}>
          <View style={globalStyles.popUp}>
            <Image 
                  source={{ uri: state.selected.Poster}}
                  style={{
                    width: '100%', 
                    height: 300
                  }}
                  resizeMode='cover'
              />
            <Text style={globalStyles.popTitle}> {state.selected.Title}</Text>
            <Text style={globalStyles.rating}> Rating: {state.selected.imdbRating} </Text>
            <Text style={globalStyles.plot}> {state.selected.Plot} </Text>
            <Button title='Close' onPress={() => setState(prevState => {
              return { ...prevState, selected: {} }
            })} />
          </View>
      </Modal>

      <StatusBar style="auto" />

    </View>
  );
}