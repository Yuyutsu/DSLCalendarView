# Quick Start with Expo (Easiest Method)

If you want to quickly test the NLPCalendar component without setting up iOS/Android native development tools, use Expo!

## What is Expo?

Expo is a framework that allows you to run React Native apps without Xcode or Android Studio. You can test on your physical device or web browser.

## Prerequisites

- Node.js (v16 or higher)
- A smartphone with the Expo Go app:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Step-by-Step Guide

### 1. Create an Expo App

```bash
# Create a new Expo app
npx create-expo-app@latest NLPCalendarDemo
cd NLPCalendarDemo
```

### 2. Install the NLPCalendar Component

Since the component uses React Native core components, it should work with Expo:

```bash
# Copy the component source into your project
mkdir -p src/nlp-calendar
cp -r ../DSLCalendarView/react-native/src/* src/nlp-calendar/
```

### 3. Create the Demo App

Replace `App.tsx` or `App.js` with:

```tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import the component locally
import { parseNaturalLanguage } from './src/nlp-calendar/parser/nlpParser';
import { EventList } from './src/nlp-calendar/components/EventList';
import { ErrorDisplay } from './src/nlp-calendar/components/ErrorDisplay';

export default function App() {
  const [text, setText] = useState(
    'Meeting tomorrow at 3pm\nCall on January 15\nVacation from June 1 to June 10'
  );

  const parseResult = parseNaturalLanguage(text);
  const { events, errors } = parseResult;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📅 NLP Calendar Demo</Text>
          <Text style={styles.subtitle}>
            Enter events in natural language
          </Text>
          {events.length > 0 && (
            <Text style={styles.eventCount}>
              {events.length} event{events.length !== 1 ? 's' : ''} found
            </Text>
          )}
        </View>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Try: Meeting tomorrow at 3pm"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <ScrollView style={styles.scrollView}>
          <ErrorDisplay errors={errors} />
          <EventList events={events} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  eventCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
  input: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
});
```

### 4. Run the App

```bash
# Start Expo
npx expo start
```

This will open Expo DevTools in your browser. You can:
- Press `i` to open iOS Simulator (macOS only)
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your phone

## Example Inputs to Try

```
Meeting tomorrow
Call John on January 15
Vacation from June 1 to June 10
Dentist next Monday
Team meeting today
Conference next week
```

## Advantages of Expo

- ✅ No Xcode or Android Studio required
- ✅ Test on real device easily
- ✅ Fast refresh and hot reload
- ✅ Web preview available
- ✅ Easy to share (generate QR code)

## Limitations

- Some native modules may not work in Expo Go
- For production apps, you may need to eject to bare React Native

## Next Steps

Once you're comfortable with Expo, you can:
1. Publish your app: `npx expo publish`
2. Build standalone apps: `eas build`
3. Deploy to app stores

## Need Help?

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Forums](https://forums.expo.dev/)

Happy testing! 🎉
