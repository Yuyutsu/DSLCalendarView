/**
 * NLPCalendar Demo App for React Native CLI
 * 
 * This is a standalone demo application that showcases the NLPCalendar component.
 * 
 * Setup:
 * 1. Create a React Native app: npx react-native@latest init NLPCalendarDemo
 * 2. Copy react-native/src/* to src/nlp-calendar/
 * 3. Replace App.tsx with this file
 * 4. Run: npm run ios (or npm run android)
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Import the component locally
// Make sure you've copied react-native/src/* to src/nlp-calendar/
import { parseNaturalLanguage } from './src/nlp-calendar/parser/nlpParser';
import { EventList } from './src/nlp-calendar/components/EventList';
import { ErrorDisplay } from './src/nlp-calendar/components/ErrorDisplay';

// Example inputs for quick testing
const EXAMPLE_INPUTS = [
  'Meeting tomorrow at 3pm',
  'Call John on January 15',
  'Vacation from June 1 to June 10',
  'Dentist next Monday',
  'Team standup today',
  'Conference next week',
];

function App(): JSX.Element {
  const [text, setText] = useState(
    'Meeting tomorrow at 3pm\nCall on January 15\nVacation from June 1 to June 10'
  );

  const parseResult = parseNaturalLanguage(text);
  const { events, errors } = parseResult;

  const loadExample = (example: string) => {
    setText(example);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📅 NLP Calendar Demo</Text>
          <Text style={styles.subtitle}>
            Enter events in natural language
          </Text>
          {events.length > 0 && (
            <Text style={styles.eventCount}>
              {events.length} event{events.length !== 1 ? 's' : ''} found
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter your events:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Try: Meeting tomorrow at 3pm"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

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

        <ScrollView style={styles.scrollView}>
          <ErrorDisplay errors={errors} />
          <EventList events={events} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
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

export default App;
