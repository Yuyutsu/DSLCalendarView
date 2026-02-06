import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CalendarEvent } from '../types';
import { EventItem } from './EventItem';

interface EventListProps {
  events: CalendarEvent[];
  emptyMessage?: string;
}

/**
 * Component to display a list of calendar events
 * Pure UI component - no business logic
 */
export const EventList: React.FC<EventListProps> = ({
  events,
  emptyMessage = 'No events found',
}) => {
  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventItem event={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
