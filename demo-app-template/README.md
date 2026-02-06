# NLPCalendar Demo App Template

This directory contains templates and instructions to quickly set up a demo app.

## Quick Setup Scripts

### For Expo (Easiest)

Run this in your terminal:

```bash
# Navigate to a directory where you want to create the demo
cd ~/Desktop  # or your preferred location

# Create Expo app
npx create-expo-app@latest NLPCalendarDemo
cd NLPCalendarDemo

# Copy the NLP calendar source
mkdir -p src/nlp-calendar
cp -r /path/to/DSLCalendarView/react-native/src/* src/nlp-calendar/

# Copy the demo App.tsx
cp /path/to/DSLCalendarView/demo-app-template/App.expo.tsx App.tsx

# Start the app
npx expo start
```

### For React Native CLI

```bash
# Navigate to a directory where you want to create the demo
cd ~/Desktop  # or your preferred location

# Create React Native app
npx react-native@latest init NLPCalendarDemo
cd NLPCalendarDemo

# Install TypeScript types
npm install --save-dev @types/react @types/react-native

# Copy the demo App.tsx
cp /path/to/DSLCalendarView/demo-app-template/App.native.tsx App.tsx

# Link to the library (choose one option):

# Option A: Copy source directly
mkdir -p src/nlp-calendar
cp -r /path/to/DSLCalendarView/react-native/src/* src/nlp-calendar/

# Option B: Use npm link (for development)
cd /path/to/DSLCalendarView
npm link
cd -
npm link dslcalendarview-react-native

# Run the app
npm run ios     # for iOS
npm run android # for Android
```

## What's Included

- `App.expo.tsx` - Demo app for Expo
- `App.native.tsx` - Demo app for React Native CLI
- `README.md` - This file

## Files to Copy

When setting up your demo app, you'll need:

1. **The component source code** from `react-native/src/`
2. **One of the App templates** (expo or native)
3. **Type definitions** from `react-native/src/types/`

## Customization

Feel free to modify the demo apps:
- Change the UI styling
- Add more example inputs
- Integrate with a backend
- Add persistence features

## Support

- Check [GETTING_STARTED.md](../GETTING_STARTED.md) for detailed setup
- Check [EXPO_QUICKSTART.md](../EXPO_QUICKSTART.md) for Expo-specific help
- See [react-native/README.md](../react-native/README.md) for API docs
