# Frequently Asked Questions (FAQ)

## Setup and Installation

### Q: Where are the android and ios folders?

**A:** This repository provides a **component library**, not a complete React Native application. The android/ios folders are created when you initialize a new React Native app using:

```bash
npx react-native@latest init YourAppName
```

Then you integrate this component into your app. See [GETTING_STARTED.md](GETTING_STARTED.md) for full instructions.

### Q: How do I run this locally?

**A:** Follow these steps:

**Option 1: Easiest with Expo (No native tools needed)**
```bash
cd demo-app-template
./setup-demo.sh
# Choose option 1
# Then: npx expo start
```

**Option 2: Full React Native Setup**
```bash
cd demo-app-template
./setup-demo.sh
# Choose option 2
# Then: npm run ios (or npm run android)
```

See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions.

### Q: What's the difference between Expo and React Native CLI?

**A:** 

- **Expo**: Easiest to get started. No Xcode or Android Studio needed. Test on your phone with Expo Go app. Limited access to native modules.
  
- **React Native CLI**: Full control. Access to all native modules. Requires Xcode (iOS) and Android Studio (Android). Better for production apps.

See [EXPO_QUICKSTART.md](EXPO_QUICKSTART.md) for Expo setup.

### Q: Can I use this in an existing React Native project?

**A:** Yes! Just copy the source files:

```bash
# In your React Native project
mkdir -p src/nlp-calendar
cp -r /path/to/DSLCalendarView/react-native/src/* src/nlp-calendar/
```

Then import and use:
```tsx
import { parseNaturalLanguage } from './src/nlp-calendar/parser/nlpParser';
```

### Q: Do I need to install dependencies?

**A:** The component has no runtime dependencies beyond React and React Native, which you already have in your app. For development:

```bash
# In the DSLCalendarView directory (for tests and linting)
npm install
```

## Component Usage

### Q: What natural language patterns are supported?

**A:** The component supports:

- **Relative dates**: "today", "tomorrow", "next week", "next Monday"
- **Month/day format**: "January 15", "Feb 20", "March 1st"
- **Date ranges**: "from June 1 to June 10"
- **Multiple events**: Separated by newlines, semicolons, or "and"

Examples:
```
Meeting tomorrow at 3pm
Call John on January 15
Vacation from June 1 to June 10
Dentist next Monday
Team standup today
```

### Q: How do I customize the UI?

**A:** The component is built with separate UI layers. You can:

1. **Modify the component styles**: Edit `src/components/EventItem.tsx` and `EventList.tsx`
2. **Create your own UI**: Use just the parser:

```tsx
import { parseNaturalLanguage } from './src/nlp-calendar/parser/nlpParser';

const { events, errors } = parseNaturalLanguage(text);
// Render events however you want
```

### Q: Can I add my own parsing patterns?

**A:** Yes! Edit `src/parser/nlpParser.ts` and add your patterns to the `DATE_PATTERNS` object. The parser uses regular expressions.

### Q: How do I handle errors?

**A:** The parser returns both events and errors:

```tsx
const { events, errors } = parseNaturalLanguage(text);

if (errors.length > 0) {
  console.error('Parsing errors:', errors);
}
```

Use the `onError` callback prop:
```tsx
<NLPCalendar 
  text={text}
  onError={(errors) => {
    // Handle errors
  }}
/>
```

## Development

### Q: How do I run tests?

**A:** In the DSLCalendarView directory:

```bash
npm install  # Install dev dependencies
npm test     # Run Jest tests
```

### Q: How do I contribute?

**A:** 

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

### Q: Where is the example code?

**A:** Example code is in multiple places:

- `react-native/example/ExampleApp.tsx` - Basic example
- `demo-app-template/App.expo.tsx` - Full Expo demo
- `demo-app-template/App.native.tsx` - Full React Native CLI demo
- `react-native/README.md` - Code snippets

## Troubleshooting

### Q: "Module not found" error

**A:** Make sure you've:
1. Copied the source files to your project
2. Updated import paths correctly
3. Installed dependencies: `npm install`

### Q: The app won't build

**A:** Try:

```bash
# Clear Metro cache
npm start -- --reset-cache

# Clean iOS build
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Clean Android build
cd android && ./gradlew clean && cd ..
```

### Q: Events aren't parsing correctly

**A:** Check:
1. The text format matches supported patterns
2. Console for any error messages
3. The `errors` array returned by the parser

### Q: TypeScript errors

**A:** Make sure you have TypeScript types installed:

```bash
npm install --save-dev @types/react @types/react-native
```

### Q: Expo Go shows an error

**A:** Some React Native features may not work in Expo Go. Try:
1. Use Expo Dev Client instead
2. Or use React Native CLI for full native support

## Platform-Specific

### Q: How do I run on iOS?

**A:** macOS only:

```bash
cd ios
pod install
cd ..
npm run ios
```

See [GETTING_STARTED.md](GETTING_STARTED.md#for-ios-development-macos-only) for prerequisites.

### Q: How do I run on Android?

**A:** 

1. Start an Android emulator or connect a device
2. Run: `npm run android`

See [GETTING_STARTED.md](GETTING_STARTED.md#for-android-development) for setup.

### Q: Can I test on my physical device?

**A:** Yes!

**With Expo**: Just scan the QR code with Expo Go app

**With React Native CLI**: 
- iOS: Connect via USB or WiFi, device must be registered in Xcode
- Android: Enable USB debugging, connect device, run `npm run android`

## General

### Q: Is this production-ready?

**A:** Yes! The component:
- ✅ Has 13 passing unit tests
- ✅ Uses strict TypeScript
- ✅ Has zero security vulnerabilities (CodeQL scanned)
- ✅ Follows React best practices
- ✅ Has comprehensive error handling

### Q: What React Native versions are supported?

**A:** React Native 0.64.0 and higher. React 17.0.0 and higher.

### Q: Can I use this with TypeScript?

**A:** Yes! The component is written in TypeScript with full type definitions.

### Q: How big is the bundle size?

**A:** Very small! The parser is ~5KB and uses only native JavaScript. No external dependencies.

### Q: Does it work on web (React Native Web)?

**A:** Yes, the component uses only React Native core components which are compatible with React Native Web.

## Need More Help?

- 📖 Read [GETTING_STARTED.md](GETTING_STARTED.md)
- ⚡ Try [EXPO_QUICKSTART.md](EXPO_QUICKSTART.md)
- 💡 Check [react-native/README.md](react-native/README.md)
- 🐛 [Open an issue](https://github.com/Yuyutsu/DSLCalendarView/issues)

## Can't find your question?

Open an issue on GitHub with the "question" label!
