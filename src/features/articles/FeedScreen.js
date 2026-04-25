import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; 
import { fetchFeed } from '@store';
import ArticleCard from './partials/ArticleCard';
import SearchBar from './partials/SearchBar';
import OfflinePlaceholder from './partials/OfflinePlaceholder';
import { useNetInfo } from "@react-native-community/netinfo";
const FeedScreen = ({ navigation }) => {
  const netInfo = useNetInfo();	
  const flatListRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [serverError, setServerError] = useState(true);
  
  const dispatch = useDispatch();
  // On récupère uniquement les items du feed
  const { items, hasMore, isFeedLoading, nextCursor,error } = useSelector((state) => state.articles.feed);

  useEffect(() => {
    dispatch(fetchFeed({ cursor: null, limit: 10 }));
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


  if (netInfo.isConnected === false ) {
    return <OfflinePlaceholder onRetry={handleRefresh} message="Vérifiez votre connexion internet" />;
  }

//   if ( !isFeedLoading && error) {
//     return <OfflinePlaceholder message="Le serveur ne répond pas. Veuillez réessayer plus tard." onRetry={handleRefresh} />;
//   }

  const uniqueArticles = items.filter((article, index, self) =>
	index === self.findIndex((t) => (
		t.id === article.id
	))
	);

	const filteredArticles = searchQuery
  ? uniqueArticles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : uniqueArticles;

  return (
    <View style={styles.container}>
      {/* Search Bar tout en haut */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher..."
      />
      
      <FlatList
        ref={flatListRef}
        data={filteredArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ArticleCard article={item} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0A66C2']} />
        }
        ListFooterComponent={isFeedLoading ? <ActivityIndicator size="large" /> : null}
      />

      {/* Bouton Scroll to Top */}
      {showScrollTop && (
        <TouchableOpacity style={styles.floatingButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40, // Plus joli en bas à droite
    backgroundColor: '#0A66C2',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default FeedScreen;