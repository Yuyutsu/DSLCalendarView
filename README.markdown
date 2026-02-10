
# DSLCalendarView

DSLCalendar view is an iOS control that displays a calendar similar to the system calendar. It allows the user to select a single date or a date range.

![](http://github.com/PeteC/DSLCalendarView/raw/images/Screenshot.png)

----

## React Native NLPCalendar Component

This repository now includes a React Native component that parses natural language text and displays calendar events.

### 🎯 Complete React Native CLI App - Ready to Run!

**NEW!** We now have a complete React Native CLI app with android/ios folders ready to run:

```bash
# Install dependencies for the library first
npm install

# Then set up and run the demo app
cd RNDemoApp
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
npm run ios

# For Android
npm run android
```

**Note:** The demo app imports from the parent library, so make sure you run `npm install` in the root directory first!

See [RNDemoApp/README.md](RNDemoApp/README.md) for full instructions!

### ⚡ Quick Start - Other Options

**Want to try it immediately?** Run this:

```bash
cd demo-app-template
./setup-demo.sh
# Choose option 1 (Expo - easiest, no native tools needed)
```

Then `npx expo start` and scan the QR code with your phone!

### 📖 Complete Setup Guides

- **🚀 [SETUP_GUIDE.txt](SETUP_GUIDE.txt)** - Quick reference for all options
- **⚡ [EXPO_QUICKSTART.md](EXPO_QUICKSTART.md)** - Easiest way (no Xcode/Android Studio)
- **📱 [GETTING_STARTED.md](GETTING_STARTED.md)** - Full React Native CLI setup
- **❓ [FAQ.md](FAQ.md)** - Common questions & troubleshooting

### 🤔 Where are android/ios folders?

This is a **component library**, not a complete app. Android/iOS folders are created when you initialize a React Native app using:

```bash
npx react-native init YourAppName
```

Then you integrate this component. See the guides above for step-by-step instructions.

### Quick Start Code

```tsx
import { NLPCalendar } from 'dslcalendarview-react-native';

<NLPCalendar text="Meeting on January 15; Call tomorrow at 3pm" />
```

**Features:**
- Parse natural language date expressions
- Support for relative dates (today, tomorrow, next week)
- Month/day format and date ranges
- Strict TypeScript with no `any` types
- Modular architecture (Input → Parser → Renderer)

### Example Natural Language Inputs

```
Meeting tomorrow at 3pm
Call John on January 15
Vacation from June 1 to June 10
Dentist next Monday
Conference next week
```

### Documentation

- 📖 [Component API Documentation](react-native/README.md)
- 🚀 [Getting Started Guide](GETTING_STARTED.md)
- ⚡ [Expo Quick Start](EXPO_QUICKSTART.md)
- 💡 [Example Code](react-native/example/ExampleApp.tsx)

----

## iOS Components

## DSLCalendarMonthSelectorView

DSLCalendarMonthSelectorView is the view displayed above the current month. It contains a label showing the current month and year, labels for the days of the week and buttons to allow the user to navigate to the previous or next month.

## DSLCalendarMonthView

DSLCalendarMonthView contains a grid of DSLCalendarDayViews for a specific month.

## DSLCalendarDayView

DSLCalendarDayView is the view that represents a single day in a month view

----

## Appearance Customisation

To customise the appearance of the calendar, you should subclass DSLCalendarView and optionally DSLCalendarMonthSelectorView, DSLCalendarMonthView and DSLCalendarDayView. In your DSLCalendarView subclass, you should override the following methods to specify which classes the calendar view should use:

```objective-c
+ (Class)monthSelectorViewClass;
+ (Class)monthViewClass;
+ (Class)dayViewClass;
```

This project is still a work in progress so while the appearnce customisation should work, it's not been fully tested yet. I will adding a customisation to the example project to both test customisation and to show a working example.


----

## ARC

This project uses ARC.

---

## License
Copyright © 2012 Pete Callaway. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of the author nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.