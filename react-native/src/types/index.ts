/**
 * Represents a parsed calendar event
 */
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
}

/**
 * Result of parsing natural language text
 */
export interface ParseResult {
  events: CalendarEvent[];
  errors: string[];
}

/**
 * Props for the NLPCalendar component
 */
export interface NLPCalendarProps {
  text: string;
  onEventsChange?: (events: CalendarEvent[]) => void;
  onError?: (errors: string[]) => void;
}
