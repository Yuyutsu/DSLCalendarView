/**
 * Example usage of the NLPCalendar component
 * 
 * This demonstrates the basic usage patterns for the NLPCalendar component.
 * Copy this code into a React Native app to see it in action.
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import { NLPCalendar, CalendarEvent } from '../index';

export default function ExampleApp() {
  const [text, setText] = useState(
    'Meeting on January 15\nCall tomorrow at 3pm\nVacation from June 1 to June 10'
  );
  const [eventCount, setEventCount] = useState(0);

  const handleEventsChange = (events: CalendarEvent[]) => {
    console.log('Events parsed:', events);
    setEventCount(events.length);
  };

  const handleError = (errors: string[]) => {
    console.error('Parsing errors:', errors);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NLP Calendar Example</Text>
        <Text style={styles.subtitle}>
          Enter events in natural language
        </Text>
        {eventCount > 0 && (
          <Text style={styles.eventCount}>
            {eventCount} event{eventCount !== 1 ? 's' : ''} found
          </Text>
        )}
      </View>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter events in natural language..."
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.calendarContainer}>
        <NLPCalendar
          text={text}
          onEventsChange={handleEventsChange}
          onError={handleError}
        />
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
  input: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
  },
  calendarContainer: {
    flex: 1,
  },
});
