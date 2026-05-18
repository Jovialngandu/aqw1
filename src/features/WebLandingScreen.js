import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform, useWindowDimensions } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

const WebLandingScreen = ({ navigation }) => { 
  const { width } = useWindowDimensions(); 
  const isLargeScreen = width >= 900; 

  // Protection Mobile
  if (Platform.OS !== 'web') { 
    navigation.replace('Feed'); 
    return null; 
  } 

  const handleStartReading = () => { 
    navigation.navigate('Feed'); 
  }; 

  return ( 
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}> 
      
      {/* ================= NAVBAR MINIMALISTE ================= */} 
      <View style={styles.navbar}> 
        <View style={styles.navLeft}> 
          <View style={styles.logoIcon}> 
            <Ionicons name="terminal" size={18} color="#fff" /> 
          </View> 
          <Text style={styles.navTitle}>Tech<Text style={styles.navTitleBold}>Feed</Text></Text> 
        </View> 
        <View style={styles.navRight}> 
          {/* Un seul bouton d'action principal puisque la connexion n'est pas dispo */}
          <TouchableOpacity style={styles.registerButton} onPress={handleStartReading}> 
            <Text style={styles.registerButtonText}>Ouvrir l'application</Text> 
          </TouchableOpacity> 
        </View> 
      </View> 

      {/* ================= HERO SECTION ÉDITORIALE ================= */} 
      <View style={[styles.heroSection, { flexDirection: isLargeScreen ? 'row' : 'column-reverse' }]}> 
        <View style={[styles.heroLeft, { width: isLargeScreen ? '50%' : '100%', marginTop: isLargeScreen ? 0 : 40 }]}> 
          <Text style={styles.heroTitle}>
            Là où les esprits de la tech se rencontrent.
          </Text> 
          <Text style={styles.heroSubtitle}>
            Découvrez des perspectives uniques sur le développement, le design et l'écosystème de l'innovation. Simple. Rapide. Sans algorithme polluant.
          </Text> 
          
          <TouchableOpacity style={styles.ctaButton} onPress={handleStartReading}> 
            <Text style={styles.ctaButtonText}>Découvrir le flux</Text> 
            <Ionicons name="reader-outline" size={18} color="#fff" style={{ marginLeft: 10 }} /> 
          </TouchableOpacity> 
        </View> 

        <View style={[styles.heroRight, { width: isLargeScreen ? '45%' : '100%' }]}> 
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop' }} 
            style={styles.heroImage} 
          /> 
        </View> 
      </View>

      {/* ================= SECTION TENDANCES (Style Medium) ================= */}
      <View style={styles.trendingSection}>
        <View style={styles.trendingHeader}>
          <Ionicons name="trending-up-outline" size={22} color="#050505" style={{ marginRight: 10 }} />
          <Text style={styles.trendingMainTitle}>Actuellement sur TechFeed</Text>
        </View>

        <View style={[styles.trendingGrid, { flexDirection: isLargeScreen ? 'row' : 'column' }]}>
          <View style={[styles.trendingItem, { width: isLargeScreen ? '31%' : '100%' }]}>
            <Text style={styles.trendingNumber}>01</Text>
            <View style={styles.trendingContent}>
              <Text style={styles.trendingSource}>Dev Community</Text>
              <Text style={styles.trendingTitle}>Pourquoi les architectures distribuées dominent en 2026</Text>
            </View>
          </View>

          <View style={[styles.trendingItem, { width: isLargeScreen ? '31%' : '100%' }]}>
            <Text style={styles.trendingNumber}>02</Text>
            <View style={styles.trendingContent}>
              <Text style={styles.trendingSource}>UI/UX Trends</Text>
              <Text style={styles.trendingTitle}>Le retour des interfaces squeuomorphes et minimalistes</Text>
            </View>
          </View>

          <View style={[styles.trendingItem, { width: isLargeScreen ? '31%' : '100%' }]}>
            <Text style={styles.trendingNumber}>03</Text>
            <View style={styles.trendingContent}>
              <Text style={styles.trendingSource}>Open Source</Text>
              <Text style={styles.trendingTitle}>L'évolution des licences logicielles face aux LLM locaux</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ================= FEATURES SECTIONS (Asymétrique) ================= */} 
      <View style={styles.featuresSection}> 
        <View style={[styles.splitFeature, { flexDirection: isLargeScreen ? 'row' : 'column' }]}>
          <View style={[styles.splitTextContainer, { width: isLargeScreen ? '50%' : '100%' }]}>
            <Text style={styles.featureBadge}>CONFLIT VISUEL MINI</Text>
            <Text style={styles.featureBlockTitle}>Une lecture fluide, pensée pour vos yeux.</Text>
            <Text style={styles.featureBlockDesc}>
              Marre des popups et des bannières agressives ? Notre lecteur n'affiche les images et les compléments textuels que si vous cliquez sur l'article. Économisez votre batterie, votre bande passante, et votre concentration.
            </Text>
          </View>
          <View style={[styles.splitImageContainer, { width: isLargeScreen ? '45%' : '100%' }]}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.splitImage} 
            />
          </View>
        </View>
      </View> 

      {/* ================= FOOTER ================= */} 
      <View style={styles.footer}> 
        <Text style={styles.footerText}>© 2026 TechFeed. Conçu pour le Web moderne.</Text> 
      </View> 
    </ScrollView> 
  ); 
}; 

const styles = StyleSheet.create({ 
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    fontFamily: 'system-ui, -apple-system, sans-serif', 
  }, 
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: '10%', 
    paddingVertical: 25, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f3f4f6', 
  }, 
  navLeft: { flexDirection: 'row', alignItems: 'center' }, 
  logoIcon: { 
    backgroundColor: '#050505', 
    padding: 7, 
    borderRadius: 8, 
    marginRight: 10, 
  },
  navTitle: { fontSize: 22, fontWeight: '400', color: '#050505', letterSpacing: -0.5 }, 
  navTitleBold: { fontWeight: '800', color: '#0A66C2' }, 
  navRight: { flexDirection: 'row', alignItems: 'center' }, 
  registerButton: { backgroundColor: '#0A66C2', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25 }, 
  registerButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 }, 

  // Hero Section
  heroSection: { 
    paddingHorizontal: '10%', 
    paddingVertical: 80, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
  }, 
  heroLeft: { paddingRight: 40 }, 
  heroTitle: { 
    fontSize: 56, 
    fontWeight: '800', 
    color: '#050505', 
    lineHeight: 66, 
    letterSpacing: -2,
  }, 
  heroSubtitle: { fontSize: 19, color: '#4b5563', marginTop: 24, lineHeight: 30, fontWeight: '400' }, 
  ctaButton: { 
    backgroundColor: '#050505', 
    alignSelf: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 30, 
    marginTop: 40, 
  }, 
  ctaButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 }, 
  heroRight: { height: 380, borderRadius: 4, overflow: 'hidden' }, 
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' }, 

  // Section Tendances
  trendingSection: {
    paddingHorizontal: '10%',
    paddingVertical: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    backgroundColor: '#fafafa',
  },
  trendingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 35 },
  trendingMainTitle: { fontSize: 16, fontWeight: '700', color: '#050505', letterSpacing: 0.5, textTransform: 'uppercase' },
  trendingGrid: { justifyContent: 'space-between', gap: 30 },
  trendingItem: { flexDirection: 'row', alignItems: 'flex-start' },
  trendingNumber: { fontSize: 32, fontWeight: '300', color: '#e5e7eb', marginRight: 15, marginTop: -5 },
  trendingContent: { flex: 1 },
  trendingSource: { fontSize: 12, fontWeight: '700', color: '#0A66C2', marginBottom: 5 },
  trendingTitle: { fontSize: 15, fontWeight: '700', color: '#050505', lineHeight: 21 },

  // Asymmetric Feature Block
  featuresSection: { paddingHorizontal: '10%', paddingVertical: 100 }, 
  splitFeature: { justifyContent: 'space-between', alignItems: 'center', gap: 40 },
  splitTextContainer: { paddingRight: 20 },
  featureBadge: { fontSize: 11, fontWeight: '700', color: '#10b981', letterSpacing: 1.5, marginBottom: 12 },
  featureBlockTitle: { fontSize: 32, fontWeight: '800', color: '#050505', lineHeight: 40, letterSpacing: -0.5 },
  featureBlockDesc: { fontSize: 16, color: '#4b5563', lineHeight: 26, marginTop: 15 },
  splitImageContainer: { height: 300, borderRadius: 12, overflow: 'hidden' },
  splitImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  // Footer 
  footer: { paddingVertical: 40, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f3f4f6' }, 
  footerText: { color: '#9ca3af', fontSize: 13 }, 
}); 

export default WebLandingScreen;