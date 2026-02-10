# RNDemoApp Usage Examples

This directory contains two example implementations of the NLPCalendar component.

## 📁 Files

### 1. App.tsx (Manual Parsing - Default)
**Use case:** Advanced users who want full control over UI and parsing

Shows how to:
- Import parser utilities directly
- Manually parse natural language text
- Use individual UI components (EventList, ErrorDisplay)
- Build custom UIs around the parser
- Handle events and errors separately

```tsx
import { parseNaturalLanguage, EventList, ErrorDisplay } from '../react-native';

const { events, errors } = parseNaturalLanguage(text);
<EventList events={events} />
<ErrorDisplay errors={errors} />
```

**Best for:**
- Custom UI implementations
- When you need fine-grained control
- Learning how the library works internally

### 2. AppSimple.tsx (Component Usage)
**Use case:** Simple, straightforward usage

Shows how to:
- Import and use the NLPCalendar component directly
- Let the component handle parsing and display
- Use callbacks for event changes and errors
- Minimal code, maximum functionality

```tsx
import { NLPCalendar } from '../react-native';

<NLPCalendar
  text={text}
  onEventsChange={(events) => console.log(events)}
  onError={(errors) => console.log(errors)}
/>
```

**Best for:**
- Quick integration
- Standard use cases
- Minimal configuration needed

## 🔄 Switching Between Examples

To use the simple component version:

### Option 1: Replace the main App
```bash
# Backup current App.tsx
mv App.tsx AppManual.tsx

# Use the simple version
mv AppSimple.tsx App.tsx
```

### Option 2: Change index.js
Edit `index.js` to import from AppSimple:

```javascript
import App from './AppSimple';  // Instead of './App'
```

## 📚 Public API

Both examples import from the public API (`../react-native`) which exports:

### Components
- `NLPCalendar` - Main component (all-in-one)
- `EventList` - Display list of events
- `EventItem` - Single event display
- `ErrorDisplay` - Show parsing errors

### Functions
- `parseNaturalLanguage(text: string)` - Parse text into events

### Types
- `CalendarEvent` - Event object structure
- `ParseResult` - Parser return type
- `NLPCalendarProps` - Component props

## 🎯 Which Approach Should I Use?

### Use NLPCalendar Component (AppSimple.tsx) if:
- ✅ You want the quickest setup
- ✅ Standard calendar display is fine
- ✅ You don't need custom UI
- ✅ You're building a simple app

### Use Manual Parsing (App.tsx) if:
- ✅ You need custom UI components
- ✅ You want to integrate with other calendar libraries
- ✅ You need fine-grained control over rendering
- ✅ You're building a complex app with specific requirements

## 💡 Example: Hybrid Approach

You can also mix both approaches:

```tsx
import { NLPCalendar, parseNaturalLanguage } from '../react-native';

function MyApp() {
  const [text, setText] = useState('');
  
  // Use manual parsing for some logic
  const { events } = parseNaturalLanguage(text);
  console.log('Found', events.length, 'events');
  
  // But use the component for display
  return <NLPCalendar text={text} />;
}
```

## 🔍 Learning Path

1. **Start with AppSimple.tsx** - See the simplest usage
2. **Then check App.tsx** - Understand the internals
3. **Build your own** - Combine approaches as needed

## 📖 More Resources

- [react-native/README.md](../react-native/README.md) - Full API documentation
- [GETTING_STARTED.md](../GETTING_STARTED.md) - Setup guide
- [FAQ.md](../FAQ.md) - Common questions
