import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Utilisation d'Ionicons

const SearchBar = ({ value, onChangeText, onSubmit, placeholder = 'Rechercher...' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        {/* Icône Expo */}
        <Ionicons name="search" size={18} color="#65676B" style={styles.searchIcon} />
        
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#65676B"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
        
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            {/* Icône Expo */}
            <Ionicons name="close-circle" size={18} color="#65676B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 50,// Ajout d'un padding top pour éviter que la search bar soit collée au bord supérieur
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: { marginRight: 8 },
  input: {
    flex: 1,
    height: '100%',
    color: '#050505',
    fontSize: 14,
  },
});

export default SearchBar;