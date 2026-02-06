#!/bin/bash

# NLPCalendar Demo Setup Script
# This script helps you quickly set up a demo app

set -e

echo "📅 NLPCalendar Demo App Setup"
echo "================================"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Choose setup method:"
echo "1) Expo (Easiest - No native tools required)"
echo "2) React Native CLI (Full native setup)"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "Setting up Expo demo app..."
    echo ""
    
    read -p "Enter demo app name (default: NLPCalendarDemo): " app_name
    app_name=${app_name:-NLPCalendarDemo}
    
    read -p "Enter location to create app (default: ~/Desktop): " location
    location=${location:-~/Desktop}
    
    # Expand tilde
    location="${location/#\~/$HOME}"
    
    cd "$location"
    
    echo "Creating Expo app: $app_name"
    npx create-expo-app@latest "$app_name"
    
    cd "$app_name"
    
    echo "Copying NLP calendar source..."
    mkdir -p src/nlp-calendar
    cp -r "$PROJECT_ROOT/react-native/src/"* src/nlp-calendar/
    
    echo "Copying demo App.tsx..."
    cp "$PROJECT_ROOT/demo-app-template/App.expo.tsx" App.tsx
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To run the app:"
    echo "  cd $location/$app_name"
    echo "  npx expo start"
    echo ""
    echo "Then:"
    echo "  - Press 'w' to open in web browser"
    echo "  - Press 'i' for iOS simulator (macOS only)"
    echo "  - Press 'a' for Android emulator"
    echo "  - Scan QR code with Expo Go app on your phone"
    echo ""
    
elif [ "$choice" = "2" ]; then
    echo ""
    echo "Setting up React Native CLI demo app..."
    echo ""
    
    read -p "Enter demo app name (default: NLPCalendarDemo): " app_name
    app_name=${app_name:-NLPCalendarDemo}
    
    read -p "Enter location to create app (default: ~/Desktop): " location
    location=${location:-~/Desktop}
    
    # Expand tilde
    location="${location/#\~/$HOME}"
    
    cd "$location"
    
    echo "Creating React Native app: $app_name"
    npx react-native@latest init "$app_name"
    
    cd "$app_name"
    
    echo "Copying NLP calendar source..."
    mkdir -p src/nlp-calendar
    cp -r "$PROJECT_ROOT/react-native/src/"* src/nlp-calendar/
    
    echo "Copying demo App.tsx..."
    cp "$PROJECT_ROOT/demo-app-template/App.native.tsx" App.tsx
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To run the app:"
    echo "  cd $location/$app_name"
    echo ""
    echo "For iOS:"
    echo "  cd ios && pod install && cd .."
    echo "  npm run ios"
    echo ""
    echo "For Android:"
    echo "  npm run android"
    echo ""
    
else
    echo "Invalid choice. Please run the script again and choose 1 or 2."
    exit 1
fi

echo "📖 For more help, see:"
echo "  - GETTING_STARTED.md"
echo "  - EXPO_QUICKSTART.md"
echo "  - react-native/README.md"
echo ""
