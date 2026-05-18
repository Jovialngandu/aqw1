import React from 'react'; 
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

// On récupère "isDarkMode" directement depuis les props envoyées par le parent
const SearchBar = ({ value, onChangeText, onSubmit, isDarkMode, placeholder = 'Rechercher...' }) => {

	const currentColors = {
		containerBg: isDarkMode ? '#1C1C1E' : '#FFFFFF',
		searchBoxBg: isDarkMode ? '#2C2C2E' : '#F0F2F5',
		text: isDarkMode ? '#FFFFFF' : '#050505',
		placeholder: isDarkMode ? '#8E8E93' : '#65676B',
		icon: isDarkMode ? '#8E8E93' : '#65676B',
	};

	return (
	<View style={[styles.container, { backgroundColor: currentColors.containerBg }]}> 
		<View style={[styles.searchBox, { backgroundColor: currentColors.searchBoxBg }]}> 
		
		{/* Icône Loupe */} 
		<Ionicons 
			name="search" 
			size={18} 
			color={currentColors.icon} 
			style={styles.searchIcon} 
		/> 
		
		<TextInput 
			style={[styles.input, { color: currentColors.text }]} 
			placeholder={placeholder} 
			placeholderTextColor={currentColors.placeholder} 
			value={value} 
			onChangeText={onChangeText} 
			onSubmitEditing={onSubmit} 
		/> 
		
		{/* Bouton pour effacer le texte */}
		{value.length > 0 && ( 
			<TouchableOpacity onPress={() => onChangeText('')}> 
			<Ionicons 
				name="close-circle" 
				size={18} 
				color={currentColors.icon} 
			/> 
			</TouchableOpacity> 
		)} 
		</View> 
	</View> 
	); 
}; 

const styles = StyleSheet.create({ 
  container: { 
    paddingHorizontal: 12, 
    paddingTop: 10,
    paddingBottom: 8, 
  }, 
  searchBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 20, 
    paddingHorizontal: 12, 
    height: 40, 
  }, 
  searchIcon: { 
    marginRight: 8 
  }, 
  input: { 
    flex: 1, 
    height: '100%', 
    fontSize: 14, 
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  }, 
}); 

export default SearchBar;