import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const SimulatedAdCard = ({ isDarkMode }) => (
  <View style={[styles.simulatedPubCard, isDarkMode && styles.darkCard]}>
    <Text style={styles.pubBadge}>SPONSORISÉ</Text>
    <Image 
      source={{ uri: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop' }} 
      style={styles.pubImage} 
    />
    <Text style={[styles.simulatedPubTitle, isDarkMode && styles.darkText]}>
      Devenez un Expert en Intelligence Artificielle
    </Text>
    <Text style={[styles.simulatedPubDesc, isDarkMode && styles.darkSubText]}>
      Rejoignez notre Masterclass intensive et apprenez à coder vos propres LLM. -80% ce mois-ci !
    </Text>
    <TouchableOpacity style={styles.pubButton}>
      <Text style={styles.pubButtonText}>En savoir plus</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  simulatedPubCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e6eb',
    overflow: 'hidden',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#1c1c1e',
    borderColor: '#2c2c2e',
  },
  pubBadge: {
    position: 'absolute',
    top: 10, left: 10, zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff', fontSize: 10, fontWeight: '700',
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4,
  },
  pubImage: { width: '100%', height: 140, backgroundColor: '#eee' },
  simulatedPubTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#050505', 
    marginTop: 10, 
    paddingHorizontal: 12,
    fontFamily: Platform.OS === 'web' ? 'system-ui, sans-serif' : undefined,
  },
  simulatedPubDesc: { 
    fontSize: 13, 
    color: '#65676B', 
    marginTop: 4, 
    paddingHorizontal: 12, 
    lineHeight: 18,
    fontFamily: Platform.OS === 'web' ? 'system-ui, sans-serif' : undefined,
  },
  darkText: { color: '#ffffff' },
  darkSubText: { color: '#a1a1aa' },
  pubButton: { backgroundColor: '#0A66C2', marginHorizontal: 12, marginTop: 12, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  pubButtonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});

export default SimulatedAdCard;