import { CalendarEvent, ParseResult } from '../types';

/**
 * Regular expressions for parsing natural language date patterns
 */
const DATE_PATTERNS = {
  // "Meeting on January 15" or "Meeting on Jan 15"
  monthDay: /\b(?:on\s+)?([A-Z][a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?\b/i,
  // "Meeting tomorrow" or "Call next week"
  relative: /\b(today|tomorrow|next\s+(?:week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/i,
  // "Meeting at 3pm" or "Call at 14:00"
  time: /\bat\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i,
  // "Meeting from Jan 15 to Jan 20"
  range: /\bfrom\s+([A-Z][a-z]+)\s+(\d{1,2})\s+to\s+([A-Z][a-z]+)\s+(\d{1,2})\b/i,
};

/**
 * Month name to number mapping
 */
const MONTH_MAP: Record<string, number> = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sep: 8, sept: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11,
};

/**
 * Parse month name to month number (0-11)
 */
function parseMonth(monthStr: string): number {
  const month = MONTH_MAP[monthStr.toLowerCase()];
  if (month === undefined) {
    throw new Error(`Invalid month: ${monthStr}`);
  }
  return month;
}

/**
 * Parse relative date expressions
 */
function parseRelativeDate(text: string): Date {
  const now = new Date();
  const lower = text.toLowerCase();

  if (lower === 'today') {
    return now;
  }

  if (lower === 'tomorrow') {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  // Handle "next week"
  if (lower === 'next week') {
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  }

  // Handle "next month"
  if (lower === 'next month') {
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }

  // Handle specific days like "next monday"
  const dayMatch = lower.match(/next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/);
  if (dayMatch) {
    const targetDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(dayMatch[1]);
    const currentDay = now.getDay();
    const daysUntil = targetDay >= currentDay ? targetDay - currentDay : 7 - currentDay + targetDay;
    const nextDayDate = new Date(now);
    nextDayDate.setDate(nextDayDate.getDate() + daysUntil + (daysUntil === 0 ? 7 : 0));
    return nextDayDate;
  }

  return now;
}

/**
 * Extract event title from text by removing date/time patterns
 */
function extractTitle(text: string): string {
  let title = text
    .replace(DATE_PATTERNS.range, '')
    .replace(DATE_PATTERNS.monthDay, '')
    .replace(DATE_PATTERNS.relative, '')
    .replace(DATE_PATTERNS.time, '')
    .trim();

  // Clean up extra spaces
  title = title.replace(/\s+/g, ' ');

  return title || 'Untitled Event';
}

/**
 * Generate unique ID for event
 */
function generateId(): string {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Parse a single event from text
 */
function parseEvent(text: string, currentYear: number): CalendarEvent | null {
  if (!text.trim()) {
    return null;
  }

  const title = extractTitle(text);
  let date: Date | null = null;
  let endDate: Date | undefined;

  // Try to parse date range first
  const rangeMatch = text.match(DATE_PATTERNS.range);
  if (rangeMatch) {
    try {
      const [, startMonth, startDay, endMonth, endDay] = rangeMatch;
      date = new Date(currentYear, parseMonth(startMonth), parseInt(startDay, 10));
      endDate = new Date(currentYear, parseMonth(endMonth), parseInt(endDay, 10));
    } catch (error) {
      // Invalid range, continue to other patterns
    }
  }

  // Try relative dates
  if (!date) {
    const relativeMatch = text.match(DATE_PATTERNS.relative);
    if (relativeMatch) {
      date = parseRelativeDate(relativeMatch[0]);
    }
  }

  // Try month/day format
  if (!date) {
    const monthDayMatch = text.match(DATE_PATTERNS.monthDay);
    if (monthDayMatch) {
      try {
        const [, month, day] = monthDayMatch;
        date = new Date(currentYear, parseMonth(month), parseInt(day, 10));
      } catch (error) {
        // Invalid date, will be caught below
      }
    }
  }

  // If no date found, use today
  if (!date) {
    date = new Date();
  }

  return {
    id: generateId(),
    title,
    date,
    endDate,
  };
}

/**
 * Main parser function - converts natural language text to calendar events
 * Pure function with no side effects
 */
export function parseNaturalLanguage(text: string): ParseResult {
  const errors: string[] = [];
  const events: CalendarEvent[] = [];

  if (!text || !text.trim()) {
    return { events, errors };
  }

  try {
    const currentYear = new Date().getFullYear();
    
    // Split by common delimiters (newlines, semicolons, "and")
    const lines = text.split(/[\n;]|(?:\s+and\s+)/gi);

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        continue;
      }

      try {
        const event = parseEvent(trimmedLine, currentYear);
        if (event) {
          events.push(event);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Failed to parse "${trimmedLine}": ${message}`);
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Parsing failed: ${message}`);
  }

  return { events, errors };
}
