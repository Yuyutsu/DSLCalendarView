/**
 * NLPCalendar - React Native Component
 * 
 * A modular calendar component that parses natural language text
 * and displays structured calendar events.
 */

// Main component
export { NLPCalendar } from './src/components/NLPCalendar';

// UI Components (for custom implementations)
export { EventList } from './src/components/EventList';
export { EventItem } from './src/components/EventItem';
export { ErrorDisplay } from './src/components/ErrorDisplay';

// Parser utilities (for manual parsing)
export { parseNaturalLanguage } from './src/parser/nlpParser';

// TypeScript types
export type { NLPCalendarProps, CalendarEvent, ParseResult } from './src/types';
