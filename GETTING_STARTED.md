# Getting Started with NLPCalendar Demo

This guide will help you run the NLPCalendar demo application locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required for All Platforms
- **Node.js** (v16 or higher): [Download](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Watchman** (macOS/Linux): [Installation Guide](https://facebook.github.io/watchman/docs/install.html)

### For iOS Development (macOS only)
- **Xcode** (latest version): Install from Mac App Store
- **CocoaPods**: Install via `sudo gem install cocoapods`
- **iOS Simulator**: Included with Xcode

### For Android Development
- **Android Studio**: [Download](https://developer.android.com/studio)
- **Android SDK** (API level 31 or higher)
- **Java Development Kit (JDK)** 11 or higher
- **Android Emulator** or physical device

## Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/Yuyutsu/DSLCalendarView.git
cd DSLCalendarView
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Initialize a Demo App

Since this is a component library, you need to create a React Native app to test it:

```bash
# Create a new React Native app in a separate directory
cd ..
npx react-native@latest init NLPCalendarDemo
cd NLPCalendarDemo
```

### Step 4: Link the Component Library

```bash
# Install the component library locally
npm install ../DSLCalendarView
```

### Step 5: Update App.tsx

Replace the content of `App.tsx` with the demo code from the component library:

```bash
cp ../DSLCalendarView/react-native/example/ExampleApp.tsx App.tsx
```

Or manually copy the example code from `react-native/example/ExampleApp.tsx`.

### Step 6: Run the App

#### For iOS (macOS only):

```bash
# Install iOS dependencies
cd ios
pod install
cd ..

# Run on iOS Simulator
npm run ios
# or specify a simulator
npx react-native run-ios --simulator="iPhone 15"
```

#### For Android:

```bash
# Start Metro bundler
npm start

# In another terminal, run on Android
npm run android
# or
npx react-native run-android
```

## Alternative: Use the Example Code Directly

If you prefer to integrate the component into your existing React Native app:

### 1. Install the Package

```bash
# In your React Native project directory
npm install path/to/DSLCalendarView
```

### 2. Import and Use

```tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { NLPCalendar } from 'dslcalendarview-react-native';

export default function App() {
  const [text, setText] = useState('Meeting tomorrow at 3pm');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter events..."
        multiline
      />
      <NLPCalendar text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
    borderRadius: 8,
    minHeight: 100 
  },
});
```

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache
```

#### 2. iOS Build Fails

```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

#### 3. Android Build Fails

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

#### 4. Module Not Found Error

Make sure you've installed dependencies:
```bash
npm install
cd ios && pod install && cd ..
```

#### 5. Port Already in Use

```bash
# Kill process on port 8081
npx react-native start --port 8082
```

### Platform-Specific Setup

#### macOS Setup for iOS

1. Install Xcode from App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

#### Windows/Linux Setup for Android

1. Install Android Studio
2. Configure environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. Create an Android Virtual Device (AVD) in Android Studio

## Example Natural Language Inputs

Try these examples in the demo app:

```
Meeting tomorrow at 3pm
Call John on January 15
Vacation from June 1 to June 10
Dentist appointment next Monday
Team standup today
Conference next week
Lunch with Sarah on Feb 20
Project deadline on March 1st
Birthday party next Friday
Workshop from April 5 to April 7
```

## Features Demonstrated

The demo app showcases:
- ✅ Natural language parsing
- ✅ Multiple event types (meetings, calls, appointments)
- ✅ Date range support
- ✅ Error handling and display
- ✅ Real-time parsing as you type
- ✅ Clean, responsive UI

## Need Help?

- Check the [React Native documentation](https://reactnative.dev/docs/environment-setup)
- Review the [component README](react-native/README.md)
- Open an issue on GitHub

## Development Mode

To develop and test changes to the component:

```bash
# In the DSLCalendarView directory
npm test          # Run tests
npm run lint      # Check code style
npm run type-check # Validate TypeScript
npm run build     # Build the component
```

## Next Steps

- Customize the UI styling in the example app
- Add your own natural language patterns
- Integrate with your calendar backend
- Add more features like recurring events

Happy coding! 🚀
