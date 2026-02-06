# NLP Calendar Demo - React Native CLI App

A complete, ready-to-run React Native CLI application demonstrating the NLPCalendar component.

## 🎯 What's This?

This is a **full React Native CLI project** with android and ios folders, ready to run on your machine. It demonstrates the NLPCalendar component that parses natural language text into calendar events.

## ✨ Features

- 📱 Complete React Native CLI app structure
- 🤖 Android support (with Gradle configuration)
- 🍎 iOS support (with CocoaPods configuration)
- 📅 NLPCalendar component integration
- 🎨 Beautiful UI with example inputs
- ⚡ Hot reload and fast refresh enabled

## 📋 Prerequisites

### For All Platforms
- Node.js (v16 or higher)
- npm or yarn
- Watchman (macOS/Linux)

### For iOS (macOS only)
- Xcode (latest version)
- CocoaPods: `sudo gem install cocoapods`
- iOS Simulator (included with Xcode)

### For Android
- Android Studio
- Android SDK (API level 21 or higher)
- Java Development Kit (JDK) 11 or higher
- Android Emulator or physical device

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd RNDemoApp
npm install
```

### 2. Run on iOS (macOS only)

```bash
# Install iOS dependencies (CocoaPods)
cd ios
pod install
cd ..

# Run the app
npm run ios

# Or specify a simulator
npx react-native run-ios --simulator="iPhone 15"
```

**Note:** The Xcode project (`RNDemoApp.xcodeproj`) is included in the repository. After running `pod install`, CocoaPods will create a `.xcworkspace` file - **always open the workspace file** in Xcode, not the project file directly.

**If `pod install` fails with checksum errors:** Use the helper script:
```bash
cd ios
./fix-pods.sh
```
See the [Troubleshooting](#-troubleshooting) section below for more details.

### 3. Run on Android

```bash
# Start Metro bundler
npm start

# In another terminal, run on Android
npm run android
```

## 📱 What You'll See

The app includes:
- **Live text input** - Type natural language events
- **Real-time parsing** - See events appear as you type
- **Quick examples** - Tap buttons to load example inputs
- **Event display** - Beautiful calendar event cards
- **Error handling** - Clear error messages when parsing fails

## 🎨 Example Natural Language Inputs

Try these in the app:

```
Meeting tomorrow at 3pm
Call John on January 15
Vacation from June 1 to June 10
Dentist next Monday
Team standup today
Conference next week
Birthday party next Friday
```

## 🏗️ Project Structure

```
RNDemoApp/
├── android/                 # Android native code
│   ├── app/
│   │   ├── build.gradle    # App-level Gradle config
│   │   └── src/main/       # Java/Kotlin source
│   └── build.gradle        # Project-level Gradle config
├── ios/                     # iOS native code
│   ├── RNDemoApp/
│   │   ├── AppDelegate.h
│   │   ├── AppDelegate.mm
│   │   └── Info.plist
│   └── Podfile             # CocoaPods dependencies
├── App.tsx                  # Main app component
├── index.js                 # App entry point
├── package.json            # Dependencies and scripts
├── metro.config.js         # Metro bundler config
├── babel.config.js         # Babel config
└── tsconfig.json           # TypeScript config
```

## 🔧 Available Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run lint       # Run ESLint
npm test           # Run tests
```

## 🐛 Troubleshooting

### Quick Fixes

| Issue | Quick Solution |
|-------|----------------|
| Podfile error: `FlipperConfiguration` | Outdated Podfile - see FlipperConfiguration Error section |
| Podfile error: `@react-native-community/cli-platform-ios` | Remove old require line - see iOS Build Fails section |
| CocoaPods checksum error | `cd ios && ./fix-pods.sh` |
| Metro bundler cache | `npm start -- --reset-cache` |
| iOS build fails | `cd ios && rm -rf Pods Podfile.lock && pod install` |
| Android build fails | `cd android && ./gradlew clean` |

### Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache
```

### iOS Build Fails

```bash
# Clean and reinstall
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

**Note:** If you see an error like `cannot load such file -- @react-native-community/cli-platform-ios/native_modules`, make sure your Podfile is updated for React Native 0.83+. The old `@react-native-community/cli-platform-ios` package has been replaced. Your Podfile should only have:

```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
```

The `native_modules` functionality is now handled automatically by `prepare_react_native_project!`.

### CocoaPods Checksum Errors (e.g., boost library)

If you encounter checksum verification errors during `pod install` (such as the boost library error):

```
[!] Error installing boost
Verification checksum was incorrect, expected ..., got ...
```

**Quick Fix:**
```bash
# Clear CocoaPods cache and retry
cd ios
pod cache clean --all
pod install --repo-update
cd ..
```

**If the issue persists, try these steps in order:**

1. **Clean specific pod cache:**
   ```bash
   cd ios
   pod cache clean boost --all
   pod install
   ```

2. **Use verbose mode to see what's happening:**
   ```bash
   pod install --verbose
   ```

3. **Try with CDN disabled (uses git instead):**
   ```bash
   # Add to top of Podfile temporarily:
   # source 'https://github.com/CocoaPods/Specs.git'
   pod install
   ```

4. **Wait and retry:** This is often a temporary CDN caching issue. Wait 10-15 minutes and try again.

5. **Try a different network:** Switch between WiFi/Ethernet or use a VPN.

**For CI/CD Environments:**
- Add retry logic: `pod install || (pod cache clean --all && pod install --repo-update)`
- Consider caching the Pods directory but not the CocoaPods cache
- Use `--verbose` flag to get better error logs

**Root Cause:** This error occurs when the downloaded boost library file doesn't match the expected checksum, usually due to:
- CDN serving a corrupted/cached version
- Network interruption during download  
- CocoaPods cache containing corrupted files

### Xcode Configuration Warnings

If you see warnings about unknown UUIDs for base_configuration_reference, these are normal during the first `pod install` and will be resolved once CocoaPods generates its configuration files.

### FlipperConfiguration Error

If you see an error like `uninitialized constant Pod::Podfile::FlipperConfiguration`, this means your Podfile contains outdated Flipper-related code. **Flipper was removed in React Native 0.74+**. 

The Podfile in this repository has been updated to remove all Flipper dependencies. If you're upgrading from an older project:
- Remove all `flipper_config` lines
- Remove `FlipperConfiguration` references  
- Remove the `__apply_Xcode_12_5_M1_post_install_workaround` call (deprecated)

For debugging, use React Native's built-in DevTools or Reactotron instead of Flipper.

### Android Build Fails

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### Port Already in Use

```bash
# Kill process on port 8081
npx react-native start --port 8082
```

## 📚 Component Details

The app uses the NLPCalendar component from `../react-native/src/`. It imports:

- `parseNaturalLanguage` - Pure function for parsing text
- `EventList` - Component for displaying events
- `ErrorDisplay` - Component for showing errors

### How It Works

1. User types natural language text
2. Text is parsed by `parseNaturalLanguage()` function
3. Parser returns structured events and errors
4. Events are displayed in a scrollable list
5. Errors are shown if parsing fails

## 🎨 Customization

### Change App Name

1. Edit `app.json` - change `displayName`
2. iOS: Edit `ios/RNDemoApp/Info.plist` - CFBundleDisplayName
3. Android: Edit `android/app/src/main/res/values/strings.xml`

### Change Bundle ID

1. iOS: Edit `ios/RNDemoApp.xcodeproj/project.pbxproj`
2. Android: Edit `android/app/build.gradle` - applicationId

### Modify UI

Edit `App.tsx` to customize:
- Styling (colors, fonts, spacing)
- Layout and components
- Example inputs
- Event display format

## 🔗 Related Documentation

- [React Native Documentation](https://reactnative.dev/)
- [NLPCalendar API](../react-native/README.md)
- [Main Repository README](../README.markdown)
- [Setup Guide](../GETTING_STARTED.md)
- [FAQ](../FAQ.md)

## ⚠️ Important Notes

### Debug vs Release

This app is configured for **debug mode** by default:
- Uses debug keystore for Android
- Connects to Metro bundler
- Includes developer tools

For production, you'll need to:
1. Generate release keystores
2. Configure signing
3. Build release APK/IPA

### New Architecture

The app uses React Native's traditional architecture. To enable the New Architecture:
- Edit `android/gradle.properties` - set `newArchEnabled=true`
- Edit `ios/Podfile` - enable Fabric

## 🆘 Need Help?

- Check the [FAQ](../FAQ.md)
- Read [GETTING_STARTED.md](../GETTING_STARTED.md)
- Open an issue on GitHub

## 📄 License

Same as parent project - BSD-2-Clause

---

**Ready to run? Just follow the Quick Start above!** 🚀
