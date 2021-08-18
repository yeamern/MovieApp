import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({

    closeButton: {
        padding: 20, 
        fontSize: 20, 
        fontWeight: '700', 
        backgroundColor: 'darkgreen',
        color: '#FFF',
    },

    container: {
      flex: 1,
      backgroundColor: 'darkgreen',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
      paddingHorizontal: 20
    },

    heading: {
        color: '#fff',
        fontSize: 18, 
        fontWeight: '700', 
        padding: 20, 
        backgroundColor: 'darkgrey'
    }, 

    movieList: {
        flex: 1,
        width: '100%', 
        marginBottom: 20
    },

    plot: { 
        fontSize: 20,
        paddingLeft: 2
    },

    popTitle: {
        fontSize: 36,
        fontWeight: '700',
        marginBottom: 5,
        color: 'darkgreen'
    },

    popUp: {
        padding: 20, 
    },

    rating: {
        fontSize: 20  , 
        marginBottom: 20, 
    },

    searchBox: {
        fontSize: 20,
        fontWeight: '300' ,
        padding: 20,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8, 
        marginBottom: 40
    },

    title: {
      color: '#fff',
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center', 
      marginBottom: 20
    },
});