/**
 * Simple NLPCalendar Demo
 * 
 * This is an alternative, simpler implementation showing how to use
 * the NLPCalendar component directly without manual parsing.
 * 
 * To use this version:
 * 1. Rename this file to App.tsx (backup the original first)
 * 2. Or import and use this component from index.js
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

// Import the NLPCalendar component - the simplest way!
import { NLPCalendar, type CalendarEvent } from '../react-native';

// Example inputs for quick testing
const EXAMPLE_INPUTS = [
  'Meeting tomorrow at 3pm',
  'Call John on January 15',
  'Vacation from June 1 to June 10',
  'Dentist next Monday',
  'Team standup today',
  'Conference next week',
];

function AppSimple(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState(
    'Meeting tomorrow at 3pm\nCall on January 15\nVacation from June 1 to June 10'
  );
  const [eventCount, setEventCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const loadExample = (example: string) => {
    setText(example);
  };

  const handleEventsChange = (events: CalendarEvent[]) => {
    setEventCount(events.length);
    console.log('Events updated:', events);
  };

  const handleError = (errors: string[]) => {
    setErrorCount(errors.length);
    if (errors.length > 0) {
      console.log('Parsing errors:', errors);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#FFF',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#007AFF"
      />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📅 NLP Calendar Demo</Text>
          <Text style={styles.subtitle}>
            Simple component usage example
          </Text>
          {eventCount > 0 && (
            <Text style={styles.eventCount}>
              {eventCount} event{eventCount !== 1 ? 's' : ''} found
            </Text>
          )}
          {errorCount > 0 && (
            <Text style={styles.errorCount}>
              {errorCount} error{errorCount !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter your events:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Try: Meeting tomorrow at 3pm"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Examples */}
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Quick Examples:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {EXAMPLE_INPUTS.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleButton}
                onPress={() => loadExample(example)}
              >
                <Text style={styles.exampleButtonText}>{example}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* NLPCalendar Component - Just pass the text! */}
        <ScrollView style={styles.scrollView}>
          <NLPCalendar
            text={text}
            onEventsChange={handleEventsChange}
            onError={handleError}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  eventCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
  errorCount: {
    fontSize: 12,
    color: '#ffcc00',
    marginTop: 4,
    fontWeight: '600',
  },
  inputContainer: {
    margin: 16,
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  examplesContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  examplesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  exampleButton: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  exampleButtonText: {
    fontSize: 12,
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default AppSimple;
