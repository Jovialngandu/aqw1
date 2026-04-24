import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Button component with Facebook-style design
 */
const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  loading = false,
  ...props
}) => {
  const variants = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    danger: styles.dangerButton,
  };

  const sizes = {
    small: styles.smallSize,
    medium: styles.mediumSize,
    large: styles.largeSize,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variants[variant],
        sizes[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          variants[variant] === styles.secondaryButton && styles.secondaryText,
          textStyle,
        ]}
      >
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  primaryButton: {
    backgroundColor: '#0A66C2',
  },
  secondaryButton: {
    backgroundColor: '#E4E6EB',
    borderWidth: 1,
    borderColor: '#CED0D4',
  },
  dangerButton: {
    backgroundColor: '#E74C3C',
  },
  disabled: {
    opacity: 0.5,
  },
  smallSize: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumSize: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeSize: {
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#0A66C2',
  },
});

export default Button;
