import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatRelativeTime } from '@utils/index';
import { showMessage } from "react-native-flash-message";

const ArticleCard = ({ article, onPress, isDarkMode }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleShare = async () => {
	const shareMessage = `${article.title}\n\nLire l'article : ${article.url}`;
	try {
		if (Platform.OS === 'web') {
			if (navigator.share) {
				await navigator.share({ title: article.title, text: article.title, url: article.url });
			} else {
				await navigator.clipboard.writeText(shareMessage);
				showMessage({
					message: "Lien copié !",
					description: "Le lien de l'article est dans votre presse-papiers.",
					type: "success", // gère automatiquement la couleur verte pro
					backgroundColor: isDarkMode ? "#2C2C2E" : "#0A66C2", // Un gris sombre ou ton bleu
					color: "#ffffff",
					duration: 2000, // Disparaît tout seul après 2 secondes					
					floating: true, 
					style: styles.messageStyle,
					titleStyle:styles.messageTitleStyle
				});
			}
		} else {
			await Share.share({ message: shareMessage });
		}
	} catch (error) {
		console.error('Erreur partage:', error);
	}
	};

	const handleReadMore = () => {
		Linking.openURL(article.url);
	};

	return (
	<View style={[styles.card, isDarkMode && styles.darkCard]}>
		{/* Header: Source et Date */}
		<View style={styles.header}>
			<Text style={styles.source}>{article.source?.name || 'Source inconnue'}</Text>
			<Text style={[styles.date, isDarkMode && styles.darkSubText]}>
				{formatRelativeTime(article.published_at)}
			</Text>
		</View>

		{/* Titre avec Police Corrigée */}
		<TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.7}>
			<Text style={[styles.title, isDarkMode && styles.darkText]}>{article.title}</Text>
		</TouchableOpacity>

		{article.content && isExpanded && (
		<View style={styles.contentContainer}>
			<Text style={[styles.content, isDarkMode && styles.darkText]}>
			{article.content}
			</Text>
		</View>
		)}

		{/* Image avec effet flouté (Data Saver) */}
		{article.image_url && (
		<TouchableOpacity style={styles.imageContainer} onPress={() => setImageLoaded(true)} activeOpacity={0.9}>
			<Image source={{ uri: article.image_url }} style={styles.image} blurRadius={imageLoaded ? 0 : 20} />
			{!imageLoaded && (
			<View style={styles.overlay}>
				<Text style={styles.tapToLoad}>Tap pour charger l'image</Text>
			</View>
			)}
		</TouchableOpacity>
		)}

		{/* Footer: Lien et Partage */}
		<View style={styles.footer}>
		<TouchableOpacity onPress={handleReadMore}>
			<Text style={styles.readMore}>Lire l'article complet</Text>
		</TouchableOpacity>
		<TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
			<Ionicons name="share-outline" size={22} color={isDarkMode ? "#a1a1aa" : "#65676B"} />
		</TouchableOpacity>
		</View>
	</View>
	);
};

const styles = StyleSheet.create({
	card: {
	backgroundColor: '#fff',
	padding: 16,
	borderBottomWidth: 1,
	borderBottomColor: '#E4E6EB',
	},
	darkCard: {
	backgroundColor: '#1c1c1e',
	borderBottomColor: '#2c2c2e',
	},
	header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
	source: { fontWeight: 'bold', fontSize: 13, color: '#0A66C2' },
	date: { fontSize: 12, color: '#65676B' },
	darkSubText: { color: '#a1a1aa' },

	title: {
	fontSize: 17,
	fontWeight: '700',
	color: '#050505',
	marginBottom: 10,
	lineHeight: 23,
	fontFamily: Platform.OS === 'web' ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : undefined,
	},
	darkText: { color: '#ffffff' },
	contentContainer: { marginTop: 4, marginBottom: 15 },
	content: {
	fontSize: 14,
	color: '#1c1e21',
	lineHeight: 20,
	fontFamily: Platform.OS === 'web' ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : undefined,
	},
	imageContainer: { height: 260, borderRadius: 12, overflow: 'hidden', marginBottom: 12, backgroundColor: '#E4E6EB' },
	image: { width: '100%', height: '100%' },
	overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
	tapToLoad: { color: '#fff', fontWeight: '600', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 } },
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
	readMore: { color: '#0A66C2', fontWeight: '600', fontSize: 13 },
	shareBtn: { padding: 4 },
	messageStyle:{
		alignSelf: 'center', 
		paddingVertical: 8, 
		paddingHorizontal: 20,
		borderRadius: 5, 
		marginTop: 10,
		elevation: 4, 
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
	},
	messageTitleStyle: {
	fontSize: 13,
	fontWeight: "600",
	textAlign: "center",
	}
});

export default ArticleCard;