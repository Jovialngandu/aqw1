import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedHeader = ({ isDarkMode, onToggleTheme }) => {
	return (
	<View style={[styles.appHeader, isDarkMode && styles.darkHeader]}>
		<View style={styles.headerLeft}>
			{/* Chargement de l'icône depuis tes assets locaux */}
			{/* <Image 
		source={require('../../../../assets/icon.png')} 
		style={styles.logoIcon} 
		/> */}
			<View style={styles.logoIcon}>
				<Ionicons name="terminal" size={18} color="#fff" />
			</View>
			<Text style={[styles.appTitle, isDarkMode && styles.darkText]}>
				Tech<Text style={styles.appTitleBold}>Feed</Text>
			</Text>
		</View>
			
		<View style={styles.headerRight}>
			{/* Bouton de bascule Mode Sombre / Mode Clair */}
			<TouchableOpacity 
				style={[styles.headerActionButton, isDarkMode && styles.darkButton]} 
				onPress={onToggleTheme}
			>
				<Ionicons 
				name={isDarkMode ? "sunny" : "moon"} 
				size={20} 
				color={isDarkMode ? "#ffffff" : "#050505"} 
				/>
			</TouchableOpacity>
		</View>
	</View>
	);
};

const styles = StyleSheet.create({
	appHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: '#fff',
		// borderBottomWidth: 1,
		borderBottomColor: '#f0f2f5',
	},
	darkHeader: {
		backgroundColor: '#1c1c1e',
		borderBottomColor: '#2c2c2e',
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	logoIcon: {
		width: 28,
		height: 28,
		borderRadius: 6,
		marginRight: 10,
	},
	appTitle: {
		fontSize: 19,
		fontWeight: '500',
		color: '#050505',
		letterSpacing: -0.5,
		fontFamily: Platform.OS === 'web' ? 'system-ui, sans-serif' : undefined,
	},
	appTitleBold: {
		fontWeight: '800',
		color: '#0A66C2',
	},
	darkText: {
	color: '#ffffff',
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerActionButton: {
		padding: 8,
		borderRadius: 20,
		backgroundColor: '#f0f2f5',
	},
	darkButton: {
		backgroundColor: '#2c2c2e',
	},

	logoIcon: {
		backgroundColor: '#000000', // Le bleu LinkedIn de ton app
		padding: 6,
		borderRadius: 8,
		marginRight: 10,
	},
});

export default FeedHeader;