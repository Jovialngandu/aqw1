import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Share, 
  Linking 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatRelativeTime } from '@utils/index'; 

const ArticleCard = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nLire l'article : ${article.url}`,
      });
    } catch (error) {
      console.error('Erreur partage:', error);
    }
  };

  const handleReadMore = () => {
    Linking.openURL(article.url);
  };

  return (
    <View style={styles.card}>
      {/* Header: Source et Date */}
      <View style={styles.header}>
        <Text style={styles.source}>{article.source?.name || 'Source inconnue'}</Text>
        <Text style={styles.date}>{formatRelativeTime(article.published_at)}</Text>
      </View>

      {/* Titre */}
	  <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
		<Text style={styles.title}>{article.title}</Text>
	  </TouchableOpacity>

	  {article.content && (
		<View style={styles.contentContainer}>
			{isExpanded && (
			<Text style={styles.content}>
				{article.content}
			</Text>
			)}
		</View>
		)}


      {/* Image avec effet flouté (Data Saver) */}
      <TouchableOpacity 
        style={styles.imageContainer} 
        onPress={() => setImageLoaded(true)}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: article.image_url }} 
          style={styles.image} 
          blurRadius={imageLoaded ? 0 : 20}
        />
        {!imageLoaded && (
          <View style={styles.overlay}>
            <Text style={styles.tapToLoad}>Tap pour charger l'image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Footer: Lien et Partage */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={styles.readMore}>Lire l'article complet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#65676B" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0A66C2',
  },
  date: {
    fontSize: 12,
    color: '#65676B',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#050505',
    marginBottom: 12,
    lineHeight: 24,
  },
  imageContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#E4E6EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  tapToLoad: {
    color: '#fff',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  readMore: {
    color: '#0A66C2',
    fontWeight: '600',
    fontSize: 14,
  },
  contentContainer: {
	marginTop:4,
	marginBottom: 15,
  },
});

export default ArticleCard;