import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Card component with Facebook-style design
 */
const Card = ({
  children,
  style,
  elevated = true,
  padding = 12,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevation,
        { padding },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 8,
  },
  elevation: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.41,
  },
});

export default Card;
