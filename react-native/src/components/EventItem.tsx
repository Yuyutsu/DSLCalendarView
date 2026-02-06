import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarEvent } from '../types';

interface EventItemProps {
  event: CalendarEvent;
}

/**
 * Component to display a single calendar event
 * Pure UI component - no business logic
 */
export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateRange = (): string => {
    if (!event.endDate) {
      return formatDate(event.date);
    }
    return `${formatDate(event.date)} - ${formatDate(event.endDate)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDateRange()}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{event.title}</Text>
        {event.description && (
          <Text style={styles.descriptionText}>{event.description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  dateContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
