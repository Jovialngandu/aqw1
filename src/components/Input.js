import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

/**
 * Input component with Facebook-style design
 */
const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  placeholderTextColor = '#65676B',
  editable = true,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !editable && styles.disabled, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CED0D4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#050505',
  },
  disabled: {
    backgroundColor: '#E4E6EB',
    color: '#65676B',
  },
});

export default Input;
