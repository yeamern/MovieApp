import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({

    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    backButton: {
        justifyContent: 'flex-start',
        padding: 5,
    },

    closeButton: {
        // padding: 20, 
        fontSize: 20,
        color: 'white', 
        backgroundColor: '#3a3b3c',
    },

    font: {
        color: 'white',
        fontSize: 20,
        paddingLeft:12,
    },

    historyList: {
        flex: 1,
        width: '100%',  
    },

    homeContainer: {
      flex: 1,
      backgroundColor: '#3a3b3c',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
      paddingHorizontal: 20
    },

    icon: {
        padding: 13,
        alignSelf: 'center'
    },

    list: {
        color: '#fff',
        fontSize: 18,
        padding: 8, 
        backgroundColor: '#3a3b3c',
        // backgroundColor: 'red',
        width: '100%',
        flexDirection: 'row',
    }, 

    movieList: {
        flex: 1,
        width: '100%', 
    },

    plot: { 
        fontSize: 20,
        paddingLeft: 2,
        color: 'white',
        marginBottom: 50
    },

    popTitle: {
        fontSize: 36,
        fontWeight: '700',
        marginBottom: 5,
        color: 'white',
    },

    popUp: {
        padding: 20, 
        backgroundColor: '#3a3b3c',
        height: '100%',
        paddingHorizontal: 20
    },

    rating: {
        fontSize: 20  , 
        marginBottom: 20, 
        color: 'white'
    },

    removeSearchHistory: {
        // flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 'auto',
        marginRight: 0,
    },

    searchBox: {
        fontSize: 20,
        fontWeight: '300' ,
        width: '85%',
        backgroundColor: '#b0b3b8',
        borderRadius: 8, 
        paddingLeft: 10,
    },

    searchContainer: {
        flex: 1,
        backgroundColor: '#3a3b3c',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    searchHeader: {
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'row', 
        paddingTop: 40,
        backgroundColor: '#3a3b3c'
    },

    title: {
      color: 'white',
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center', 
      paddingTop: 200,
      marginBottom: 20
    },

});