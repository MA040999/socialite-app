import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { PLACEHOLDER, TRANSPARENT } from '../constants/colors';
import { NUNITO_REGULAR } from '../constants/fonts';
import { Feather, Entypo } from "@expo/vector-icons";
import {useDispatch} from 'react-redux'
import { changeSearchStatus, getPosts, removePosts, resetPage, search } from '../redux/posts/postActions';

export default function SearchBar({navigation}) {
    const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    navigation.navigate('HomeScreen')

    if (searchTerm.trim()) {
      dispatch(search(searchTerm));
      dispatch(changeSearchStatus(true));
      dispatch(resetPage());
    } else {
      dispatch(getPosts());
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    dispatch(changeSearchStatus(false));
    dispatch(removePosts());
    dispatch(getPosts());
  };

    return (
        <View style={{ ...styles.menuContainer, ...styles.searchBar }}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={PLACEHOLDER}
          style={{
            flex: 1,
            color: "white",
            fontSize: 13,
            fontFamily: NUNITO_REGULAR,
          }}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={()=>handleSearch()}
          blurOnSubmit={true}
          returnKeyType='search'

        />
        {searchTerm ? <Pressable onPress={handleCancel} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
         <Entypo
          style={{ paddingLeft: 5 }}
          name="cross"
          size={15}
          color="white"
          /> 
          
          </Pressable>
          : 
        <Feather
            style={{ paddingLeft: 5 }}
            name="search"
            size={15}
            color="white"
        />
        
        }
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 65,
      paddingHorizontal: 20,
      width: "100%",
      paddingTop: 45,
      marginBottom: 25,
    },
    menuContainer: {
      backgroundColor: TRANSPARENT,
      borderRadius: 8,
    },
    searchBar: {
      flex: 0.65,
      color: "white",
      paddingHorizontal: 8,
      height: 35,
      borderRadius: 15,
      alignItems: "center",
      flexDirection: "row",
    },
  });