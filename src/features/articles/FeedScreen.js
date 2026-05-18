import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchFeed } from '@store';
import articlesService from '../../services/articlesService'; 

// Imports de nos modules isolés (Partials)
import ArticleCard from './partials/ArticleCard';
import SearchBar from './partials/SearchBar';
import FeedHeader from './partials/FeedHeader';
import SimulatedAdCard from './partials/SimulatedAdCard';

const FeedScreen = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const flatListRef = useRef(null);

	const [showScrollTop, setShowScrollTop] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false); 

	const [sources, setSources] = useState([]);
	const [selectedSourceId, setSelectedSourceId] = useState(null);
	const [isSourcesLoading, setIsSourcesLoading] = useState(false);

	const dispatch = useDispatch();
	const isWeb = Platform.OS === 'web';

	const showLeftColumn = isWeb && width >= 1150; 
	const showRightColumn = isWeb && width >= 850; 

	const { items, hasMore, isFeedLoading, nextCursor } = useSelector((state) => state.articles.feed);

	useEffect(() => {
		dispatch(fetchFeed({ cursor: null, limit: 10 }));

		const loadSources = async () => {
			try {
			setIsSourcesLoading(true);
			const data = await articlesService.getSources();
			setSources(data || []);
			} catch (err) {
			console.error("Erreur chargement sources:", err);
			} finally {
			setIsSourcesLoading(false);
			}
		};
		loadSources();
	}, [dispatch]);

	const handleScroll = (event) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		setShowScrollTop(offsetY > 500);
	};

	const scrollToTop = () => {
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
	};

	const loadMore = useCallback(() => {
		if (hasMore && !isFeedLoading) {
			dispatch(fetchFeed({ cursor: nextCursor, limit: 10 }));
		}
	}, [hasMore, nextCursor, isFeedLoading, dispatch]);

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		await dispatch(fetchFeed({ cursor: null, limit: 10 }));
		setRefreshing(false);
	}, [dispatch]);

	// const handleArticlePress = (articleId) => {
	// 	navigation.navigate('article-detail', { articleId });
	// };

	// filtrage des articles pour éviter les doublons et appliquer les filtres de source et de recherche
	const uniqueArticles = items.filter((article, index, self) => 
		index === self.findIndex((t) => t.id === article.id)
	);

	let filteredArticles = uniqueArticles;

	if (selectedSourceId) {
		filteredArticles = filteredArticles.filter((article) => {
			const sId = typeof article.source === 'object' ? article.source?.id : article.source_id;
			return sId === selectedSourceId;
		});
	}

	if (searchQuery) {
		filteredArticles = filteredArticles.filter((article) =>
			article.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	// Construction de la liste avec les articles et les emplacements de pub
	const listData = [];
	filteredArticles.forEach((article, index) => {
		listData.push({ type: 'article', data: article, key: `article-${article.id}` });
		if (!showLeftColumn && (index + 1) % 5 === 0) {
			listData.push({ type: 'ad', key: `ad-${index}` });
		}
	});

  return (
    <View style={[styles.mainLayout, isDarkMode && styles.darkLayout]}>
      
      {/* ================= GAUCHE : BANNIÈRE DE PUB PC ================= */}
      {showLeftColumn && (
        <View style={styles.leftColumn}>
          <View style={styles.stickyWrapper}>
            <Text style={styles.pubTitle}>ESPACE PUBLICITAIRE</Text>
            <SimulatedAdCard isDarkMode={isDarkMode} />
          </View>
        </View>
      )}

      {/* ================= CENTRE : FLUX PRINCIPAL ================= */}
      <View style={[styles.container, isDarkMode && styles.darkContainer, { maxWidth: isWeb ? 600 : '100%' }]}>
			{/*Header*/}
			<FeedHeader isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
			
			{/* Barre de recherche resserrée */}
			<View style={styles.searchSection}>
				<SearchBar 
					value={searchQuery} 
					onChangeText={setSearchQuery} 
					placeholder="Rechercher..." 
					isDarkMode={isDarkMode} 
					/>       
			</View>

				{/* BANDEAU HORIZONTALE DES SOURCES (Mobile & Écrans intermédiaires) */}
			{!showRightColumn && sources.length > 0 && (
				<View style={[styles.horizontalSourcesContainer, isDarkMode && styles.darkSourcesContainer]}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
						<TouchableOpacity 
							style={[styles.chipItem, isDarkMode && styles.darkChip, !selectedSourceId && styles.chipItemActive]}
							onPress={() => setSelectedSourceId(null)}
						>
							<Text style={[styles.chipText, !selectedSourceId && styles.chipTextActive]}>Tous</Text>
						</TouchableOpacity>

						{sources.map((source) => {
							const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(source.url)}&size=32`;
							const isActive = selectedSourceId === source.id;
							return (
							<TouchableOpacity 
								key={source.id} 
								style={[styles.chipItem, isDarkMode && styles.darkChip, isActive && styles.chipItemActive]}
								onPress={() => setSelectedSourceId(source.id)}
							>
								<Image source={{ uri: faviconUrl }} style={styles.chipFavicon} />
								<Text style={[styles.chipText, isActive && styles.chipTextActive]}>{source.name}</Text>
							</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			)}

			{/* LA FLATLIST DES CONTENUS */}
			<FlatList
				ref={flatListRef}
				data={listData}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => {
					if (item.type === 'ad') {
					return (
						<View style={[styles.inFeedAdContainer, isDarkMode && styles.darkInFeedAd]}>
						<Text style={styles.pubTitleInFeed}>PUBLICITÉ</Text>
						<SimulatedAdCard isDarkMode={isDarkMode} />
						</View>
					);
					}
					return (
						<ArticleCard article={item.data} onPress={() => handleArticlePress(item.data.id)} isDarkMode={isDarkMode} />
					);
				}}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0A66C2']} />
				}
				ListFooterComponent={isFeedLoading ? <ActivityIndicator size="large" style={{ marginVertical: 15 }} /> : null}
				ListEmptyComponent={
					!isFeedLoading && (
						<View style={styles.emptyContainer}>
							<Text style={[styles.emptyText, isDarkMode && styles.darkSubText]}>Aucun article trouvé.</Text>
						</View>
					)
				}
			/>

			{showScrollTop && (
			<TouchableOpacity style={styles.floatingButton} onPress={scrollToTop}>
				<Ionicons name="arrow-up" size={24} color="white" />
			</TouchableOpacity>
			)}
      </View>

      {/* ================= DROITE : SOURCES ================= */}
      {showRightColumn && (
        <View style={styles.rightColumn}>
          <ScrollView style={styles.stickyWrapper} showsVerticalScrollIndicator={false}>
            <View style={[styles.sourcesCard, isDarkMode && styles.darkCard]}>
              <Text style={[styles.sourcesCardTitle, isDarkMode && styles.darkText]}>Sources recommandées</Text>
              
              {isSourcesLoading ? (
                <ActivityIndicator size="small" color="#0A66C2" style={{ marginTop: 20 }} />
              ) : (
                <View style={styles.sourcesList}>
                  <TouchableOpacity 
                    style={[styles.sourceItem, !selectedSourceId && styles.sourceItemActive]}
                    onPress={() => setSelectedSourceId(null)}
                  >
                    <Ionicons name="globe-outline" size={18} color={!selectedSourceId ? "#0A66C2" : isDarkMode ? "#a1a1aa" : "#666"} style={{ marginRight: 10 }} />
                    <Text style={[styles.sourceItemText, isDarkMode && styles.darkText, !selectedSourceId && styles.sourceItemTextActive]}>Toutes les sources</Text>
                  </TouchableOpacity>

                  {sources.map((source) => {
                    const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(source.url)}&size=32`;
                    const isActive = selectedSourceId === source.id;
                    return (
                      <TouchableOpacity 
                        key={source.id} 
                        style={[styles.sourceItem, isActive && styles.sourceItemActive]}
                        onPress={() => setSelectedSourceId(source.id)}
                      >
                        <Image source={{ uri: faviconUrl }} style={styles.sourceFavicon} />
                        <Text style={[styles.sourceItemText, isDarkMode && styles.darkText, isActive && styles.sourceItemTextActive]} numberOfLines={1}>{source.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
            {/* Petit espace de sécurité sous la card dans le scroll */}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'web' ? '#f0f2f5' : '#fff',
  },
  darkLayout: { backgroundColor: '#000000',
	...Platform.select({
      web: {
        scrollbarColor: '#2c2c2e #121214',
      }
    })
   },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 45 : Platform.OS === 'android' ? 35 : 0,
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#e0e0e0',
  },
  darkContainer: { backgroundColor: '#1c1c1e', borderColor: '#2c2c2e' },
  
  leftColumn: { width: 280, paddingHorizontal: 16, paddingTop: 16,
	...Platform.select({
      web: {
        scrollbarWidth: 'thin', // Plus fine et élégante
        scrollbarColor: '#2c2c2e transparent', // Devient sombre et discrète
      }
    })
   },
  rightColumn: { width: 290, paddingHorizontal: 16, paddingTop: 16, maxHeight: Platform.OS === 'web' ? '100vh' : undefined,
	...Platform.select({
      web: {
        scrollbarWidth: 'thin', // Plus fine et élégante
        scrollbarColor: '#2c2c2e transparent', // Devient sombre et discrète
      }
    })
   },
  
  // Rendu sticky natif du wrapper Web
  stickyWrapper: { 
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 16,
      }
    })
  },
  
  searchSection: { paddingVertical: 4 }, // Réduction de l'espace long sous le header
  pubTitle: { fontSize: 11, fontWeight: '700', color: '#888', marginBottom: 8, textAlign: 'center', letterSpacing: 0.5 },

  // Pubs In-Feed
  inFeedAdContainer: { padding: 12, backgroundColor: '#f7f9fa', borderBottomWidth: 1, borderBottomColor: '#e4e6eb' },
  darkInFeedAd: { backgroundColor: '#121214', borderBottomColor: '#2c2c2e' },
  pubTitleInFeed: { fontSize: 10, fontWeight: '700', color: '#888', marginBottom: 6, marginLeft: 4 },

  // Bandeau horizontal des sources
  horizontalSourcesContainer: { borderBottomWidth: 1, borderBottomColor: '#e4e6eb', backgroundColor: '#fff', paddingVertical: 8 },
  darkSourcesContainer: { backgroundColor: '#1c1c1e', borderBottomColor: '#2c2c2e' },
  horizontalScrollContent: { paddingHorizontal: 12, gap: 8 },
  chipItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  darkChip: { backgroundColor: '#2c2c2e' },
  chipItemActive: { backgroundColor: '#e8f4ff', borderWidth: 1, borderColor: '#0A66C2' },
  chipFavicon: { width: 14, height: 14, borderRadius: 3, marginRight: 6 },
  chipText: { fontSize: 13, color: '#65676B', fontWeight: '500' },
  chipTextActive: { color: '#0A66C2', fontWeight: '600' },

  // Card des sources à droite
  sourcesCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#e0e0e0' },
  darkCard: { backgroundColor: '#1c1c1e', borderColor: '#2c2c2e' },
  sourcesCardTitle: { fontSize: 16, fontWeight: '700', color: '#050505', marginBottom: 15 },
  sourcesList: { gap: 4 },
  sourceItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 6 },
  sourceItemActive: { backgroundColor: '#f0f7ff' },
  sourceFavicon: { width: 18, height: 18, borderRadius: 4, marginRight: 10, backgroundColor: '#f0f2f5' },
  sourceItemText: { fontSize: 14, color: '#050505', fontWeight: '500', flex: 1 },
  sourceItemTextActive: { color: '#0A66C2', fontWeight: '600' },
  darkText: { color: '#ffffff' },
  darkSubText: { color: '#a1a1aa' },
  
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#65676B', fontSize: 15, textAlign: 'center' },
  floatingButton: { position: 'absolute', right: 20, bottom: 40, backgroundColor: '#0A66C2', padding: 15, borderRadius: 30, elevation: 5 }
});

export default FeedScreen;