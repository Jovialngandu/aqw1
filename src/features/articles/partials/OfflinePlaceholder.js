import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OfflinePlaceholder = ({ onRetry ,message}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={64} color="#65676B" />
      <Text style={styles.title}>Pas de connexion</Text>
      <Text style={styles.subtitle}>{message}</Text>
      
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#050505',
  },
  subtitle: {
    fontSize: 14,
    color: '#65676B',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0A66C2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default OfflinePlaceholder;