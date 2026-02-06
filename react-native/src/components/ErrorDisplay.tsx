import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorDisplayProps {
  errors: string[];
}

/**
 * Component to display parsing errors
 * Pure UI component - no business logic
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parsing Warnings:</Text>
      {errors.map((error, index) => (
        <Text key={index} style={styles.errorText}>
          • {error}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    margin: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#856404',
    marginTop: 2,
  },
});
