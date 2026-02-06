import { parseNaturalLanguage } from './nlpParser';

describe('NLP Parser', () => {
  describe('parseNaturalLanguage', () => {
    it('should return empty arrays for empty text', () => {
      const result = parseNaturalLanguage('');
      expect(result.events).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    it('should parse "today" correctly', () => {
      const result = parseNaturalLanguage('Meeting today');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Meeting');
      expect(result.errors).toEqual([]);
      
      const today = new Date();
      const eventDate = result.events[0].date;
      expect(eventDate.getDate()).toBe(today.getDate());
      expect(eventDate.getMonth()).toBe(today.getMonth());
      expect(eventDate.getFullYear()).toBe(today.getFullYear());
    });

    it('should parse "tomorrow" correctly', () => {
      const result = parseNaturalLanguage('Call tomorrow');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Call');
      expect(result.errors).toEqual([]);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const eventDate = result.events[0].date;
      expect(eventDate.getDate()).toBe(tomorrow.getDate());
    });

    it('should parse month and day format', () => {
      const result = parseNaturalLanguage('Meeting on January 15');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Meeting');
      expect(result.events[0].date.getMonth()).toBe(0); // January is 0
      expect(result.events[0].date.getDate()).toBe(15);
      expect(result.errors).toEqual([]);
    });

    it('should parse abbreviated month names', () => {
      const result = parseNaturalLanguage('Presentation on Feb 20');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Presentation');
      expect(result.events[0].date.getMonth()).toBe(1); // February is 1
      expect(result.events[0].date.getDate()).toBe(20);
      expect(result.errors).toEqual([]);
    });

    it('should parse date ranges', () => {
      const result = parseNaturalLanguage('Vacation from June 1 to June 10');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Vacation');
      expect(result.events[0].date.getMonth()).toBe(5); // June is 5
      expect(result.events[0].date.getDate()).toBe(1);
      expect(result.events[0].endDate).toBeDefined();
      expect(result.events[0].endDate?.getMonth()).toBe(5);
      expect(result.events[0].endDate?.getDate()).toBe(10);
      expect(result.errors).toEqual([]);
    });

    it('should parse multiple events separated by semicolons', () => {
      const result = parseNaturalLanguage('Meeting on Jan 15; Call on Feb 20');
      expect(result.events).toHaveLength(2);
      expect(result.events[0].title).toBe('Meeting');
      expect(result.events[1].title).toBe('Call');
      expect(result.errors).toEqual([]);
    });

    it('should parse multiple events separated by newlines', () => {
      const result = parseNaturalLanguage('Meeting on Jan 15\nCall on Feb 20');
      expect(result.events).toHaveLength(2);
      expect(result.events[0].title).toBe('Meeting');
      expect(result.events[1].title).toBe('Call');
      expect(result.errors).toEqual([]);
    });

    it('should parse multiple events separated by "and"', () => {
      const result = parseNaturalLanguage('Meeting on Jan 15 and Call on Feb 20');
      expect(result.events).toHaveLength(2);
      expect(result.events[0].title).toBe('Meeting');
      expect(result.events[1].title).toBe('Call');
      expect(result.errors).toEqual([]);
    });

    it('should handle text without dates gracefully', () => {
      const result = parseNaturalLanguage('Some random text');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Some random text');
      // Should default to today's date
      expect(result.errors).toEqual([]);
    });

    it('should generate unique IDs for each event', () => {
      const result = parseNaturalLanguage('Event 1; Event 2; Event 3');
      expect(result.events).toHaveLength(3);
      const ids = result.events.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);
    });

    it('should handle "next week" correctly', () => {
      const result = parseNaturalLanguage('Meeting next week');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].title).toBe('Meeting');
      
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const eventDate = result.events[0].date;
      expect(eventDate.getDate()).toBe(nextWeek.getDate());
      expect(result.errors).toEqual([]);
    });

    it('should handle ordinal indicators (st, nd, rd, th)', () => {
      const result = parseNaturalLanguage('Event on March 1st; Meeting on April 2nd; Call on May 3rd; Dinner on June 4th');
      expect(result.events).toHaveLength(4);
      expect(result.events[0].date.getDate()).toBe(1);
      expect(result.events[1].date.getDate()).toBe(2);
      expect(result.events[2].date.getDate()).toBe(3);
      expect(result.events[3].date.getDate()).toBe(4);
      expect(result.errors).toEqual([]);
    });
  });
});
