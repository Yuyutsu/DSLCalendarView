import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { NLPCalendarProps } from '../types';
import { parseNaturalLanguage } from '../parser/nlpParser';
import { EventList } from './EventList';
import { ErrorDisplay } from './ErrorDisplay';

/**
 * NLPCalendar - A React Native component that parses natural language text
 * and displays calendar events
 * 
 * Architecture:
 * - Input Layer: Receives text via props
 * - NLP Parsing Layer: parseNaturalLanguage (pure function)
 * - Calendar Rendering Layer: EventList + ErrorDisplay (pure UI)
 * 
 * @example
 * <NLPCalendar
 *   text="Meeting on January 15; Call tomorrow at 3pm"
 *   onEventsChange={(events) => console.log(events)}
 *   onError={(errors) => console.error(errors)}
 * />
 */
export const NLPCalendar: React.FC<NLPCalendarProps> = ({
  text,
  onEventsChange,
  onError,
}) => {
  // Parse text using pure function - memoized for performance
  const parseResult = useMemo(() => {
    return parseNaturalLanguage(text);
  }, [text]);

  const { events, errors } = parseResult;

  // Notify parent component of events change
  useEffect(() => {
    if (onEventsChange) {
      onEventsChange(events);
    }
  }, [events, onEventsChange]);

  // Notify parent component of errors
  useEffect(() => {
    if (onError && errors.length > 0) {
      onError(errors);
    }
  }, [errors, onError]);

  return (
    <View style={styles.container}>
      <ErrorDisplay errors={errors} />
      <EventList events={events} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
