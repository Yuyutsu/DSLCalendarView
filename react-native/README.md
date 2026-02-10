# NLPCalendar - React Native Component

A modular React Native component that parses natural language text and displays structured calendar events.

## Features

- ✅ Parse natural language date expressions
- ✅ Support for relative dates (today, tomorrow, next week)
- ✅ Month/day format (January 15, Feb 20)
- ✅ Date ranges (from June 1 to June 10)
- ✅ Multiple events in one text
- ✅ Strict TypeScript (no `any` types)
- ✅ Functional components only
- ✅ Modular architecture
- ✅ Error handling with graceful degradation

## Architecture

The component follows a clean, modular architecture:

```
Input Layer → NLP Parsing Layer → Calendar Rendering Layer
```

### 1. Input Layer
- Receives raw text via props
- No business logic

### 2. NLP Parsing Layer (`parser/nlpParser.ts`)
- Pure functions
- No side effects
- Converts text to structured `CalendarEvent` objects
- Returns both events and errors

### 3. Calendar Rendering Layer (`components/`)
- Pure UI components
- No parsing logic
- Displays events and errors

## Installation

This is a component library. To use it in your React Native app:

### Option 1: Copy Source (Recommended for Development)

```bash
# In your React Native project
mkdir -p src/nlp-calendar
cp -r /path/to/DSLCalendarView/react-native/src/* src/nlp-calendar/
```

Then import:
```tsx
import { parseNaturalLanguage } from './src/nlp-calendar/parser/nlpParser';
import { EventList } from './src/nlp-calendar/components/EventList';
```

### Option 2: Local Package Link

```bash
# In DSLCalendarView directory
npm link

# In your React Native project
npm link dslcalendarview-react-native
```

### Option 3: Install from Repository

```bash
npm install git+https://github.com/Yuyutsu/DSLCalendarView.git
```

## Quick Start - Run Demo App

Want to see it in action first? We have setup scripts ready!

### Easiest: Expo Demo (No Xcode/Android Studio needed)

```bash
cd demo-app-template
./setup-demo.sh
```

Choose option 1 for Expo, and you'll have a working demo in minutes!

### Full Native: React Native CLI Demo

```bash
cd demo-app-template
./setup-demo.sh
```

Choose option 2 for full React Native setup with iOS/Android support.

### Manual Setup

See the detailed guides:
- [GETTING_STARTED.md](../GETTING_STARTED.md) - Full React Native CLI setup
- [EXPO_QUICKSTART.md](../EXPO_QUICKSTART.md) - Expo setup (easiest)

## Usage

### Basic Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { NLPCalendar } from 'dslcalendarview-react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NLPCalendar text="Meeting on January 15; Call tomorrow at 3pm" />
    </View>
  );
}
```

### With Event Callbacks

```tsx
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { NLPCalendar, CalendarEvent } from 'dslcalendarview-react-native';

export default function App() {
  const [text, setText] = useState('');

  const handleEventsChange = (events: CalendarEvent[]) => {
    console.log('Events:', events);
  };

  const handleError = (errors: string[]) => {
    console.error('Errors:', errors);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter events in natural language..."
        multiline
      />
      <NLPCalendar
        text={text}
        onEventsChange={handleEventsChange}
        onError={handleError}
      />
    </View>
  );
}
```

## API

### NLPCalendar Component (Recommended)

The simplest way to use the library is with the main component:

```tsx
import { NLPCalendar } from 'dslcalendarview-react-native';

<NLPCalendar 
  text="Meeting tomorrow" 
  onEventsChange={(events) => console.log(events)}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Natural language text to parse |
| `onEventsChange` | `(events: CalendarEvent[]) => void` | No | Callback when events are parsed |
| `onError` | `(errors: string[]) => void` | No | Callback when parsing errors occur |

### Exported Utilities (Advanced)

For custom implementations, you can import individual pieces:

```tsx
import { 
  parseNaturalLanguage,  // Parser function
  EventList,             // Event display component
  EventItem,             // Individual event component
  ErrorDisplay,          // Error display component
  type CalendarEvent,    // TypeScript types
  type ParseResult
} from 'dslcalendarview-react-native';
```

#### Manual Parsing Example

```tsx
import { parseNaturalLanguage, EventList, ErrorDisplay } from 'dslcalendarview-react-native';

function MyCustomCalendar({ text }: { text: string }) {
  const { events, errors } = parseNaturalLanguage(text);
  
  return (
    <>
      <ErrorDisplay errors={errors} />
      <EventList events={events} />
    </>
  );
}
```

This allows you to:
- Build custom UIs around the parser
- Use only the parsing logic
- Create your own event display components
- Integrate with other calendar libraries

### Types

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
}

interface ParseResult {
  events: CalendarEvent[];
  errors: string[];
}
```

## Supported Natural Language Patterns

### Relative Dates
- "Meeting today"
- "Call tomorrow"
- "Event next week"
- "Reminder next month"
- "Party next Friday"

### Month/Day Format
- "Meeting on January 15"
- "Call on Feb 20"
- "Event on March 1st"
- "Deadline on Apr 30th"

### Date Ranges
- "Vacation from June 1 to June 10"
- "Conference from Sep 15 to Sep 20"

### Multiple Events
- Separated by newlines: `"Event 1\nEvent 2"`
- Separated by semicolons: `"Event 1; Event 2"`
- Separated by "and": `"Event 1 and Event 2"`

## Development

### Run Tests

```bash
npm test
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

## Design Principles

1. **KISS (Keep It Simple)**: Simple, readable code
2. **YAGNI (You Aren't Gonna Need It)**: Only implement what's needed
3. **Separation of Concerns**: UI, parsing, and types are separate
4. **Pure Functions**: Parser functions have no side effects
5. **Type Safety**: Strict TypeScript with no `any` types
6. **Testability**: Small, testable functions
7. **Error Handling**: Graceful error handling throughout

## Project Structure

```
react-native/
├── index.ts                      # Main entry point
└── src/
    ├── types/
    │   └── index.ts             # TypeScript type definitions
    ├── parser/
    │   ├── nlpParser.ts         # Pure parsing functions
    │   └── nlpParser.test.ts    # Parser tests
    ├── components/
    │   ├── NLPCalendar.tsx      # Main component
    │   ├── EventList.tsx        # Event list UI
    │   ├── EventItem.tsx        # Single event UI
    │   └── ErrorDisplay.tsx     # Error display UI
    └── utils/                   # Future utilities
```

## License

BSD-2-Clause (same as the parent DSLCalendarView project)

See the full license text in the parent repository's [README.markdown](../README.markdown).
