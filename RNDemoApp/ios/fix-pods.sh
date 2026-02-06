#!/bin/bash

# Helper script to fix CocoaPods installation issues
# Especially useful for boost library checksum errors

set -e

echo "🔧 CocoaPods Installation Helper"
echo "=================================="
echo ""

# Check if we're in the ios directory
if [ ! -f "Podfile" ]; then
  if [ -d "ios" ]; then
    echo "📁 Changing to ios directory..."
    cd ios
  else
    echo "❌ Error: Podfile not found. Please run this script from the RNDemoApp or RNDemoApp/ios directory."
    exit 1
  fi
fi

echo "🧹 Step 1: Cleaning CocoaPods cache..."
pod cache clean --all

echo ""
echo "🔄 Step 2: Updating CocoaPods repo..."
pod repo update

echo ""
echo "📦 Step 3: Installing pods..."
if pod install --verbose; then
  echo ""
  echo "✅ Success! Pods installed successfully."
  echo ""
  echo "Next steps:"
  echo "  cd .."
  echo "  npm run ios"
else
  echo ""
  echo "❌ Installation failed. Here are some additional things to try:"
  echo ""
  echo "1. Wait 10-15 minutes and run this script again (CDN caching issue)"
  echo "2. Try a different network connection"
  echo "3. Clean specific pod: pod cache clean boost --all"
  echo "4. Check CocoaPods version: pod --version (should be 1.11.0 or higher)"
  echo ""
  exit 1
fi
