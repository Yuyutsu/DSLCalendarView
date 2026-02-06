import React, { useEffect, useMemo, useRef } from 'react';
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
  // Store latest callbacks in refs to avoid dependency issues
  const onEventsChangeRef = useRef(onEventsChange);
  const onErrorRef = useRef(onError);

  // Keep refs up to date
  useEffect(() => {
    onEventsChangeRef.current = onEventsChange;
  }, [onEventsChange]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Parse text using pure function - memoized for performance
  const parseResult = useMemo(() => {
    return parseNaturalLanguage(text);
  }, [text]);

  const { events, errors } = parseResult;

  // Notify parent component of events change
  useEffect(() => {
    if (onEventsChangeRef.current) {
      onEventsChangeRef.current(events);
    }
  }, [events]);

  // Notify parent component of errors
  useEffect(() => {
    if (onErrorRef.current && errors.length > 0) {
      onErrorRef.current(errors);
    }
  }, [errors]);

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
