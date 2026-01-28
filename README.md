# Wesuap - Skill Exchange App 🤝

Hey! This is my take-home project for TTP Winter Immersion. It's a React Native app where professionals can match based on skills and send collaboration offers to each other.

## What I Built

- **Animated loading screen** with confetti when you find a match 🎉
- **Profile cards** that show user info, skills, and portfolio items
- **Skill tags** with different colors for 30+ categories
- **Send offer form** that slides up when you want to collaborate
- **Bottom navigation** to move between pages

The coolest part is the loading animation - the whole orange screen swipes left to reveal your match underneath!

## How to Run This

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npm start
   ```

3. **Open it on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Or scan the QR code with Expo Go app on your phone

That's it! The app will show a loading animation, then reveal a matched profile.

## Tech Stack

- React Native + Expo
- TypeScript (first time using it in a project!)
- Expo Router for navigation
- React Native Animated API for the animations

## What I'd Do With One More Week ⏰

Honestly, there's so much more I wanted to add but ran out of time:

### Top Priority Features:
1. **Backend Integration**
   - Set up Firebase or Supabase for real data
   - Actually store profiles and assets in a database
   - Right now everything is hardcoded which is... not great lol


2. **User Authentication**
   - Login/signup flow
   - Social login (Google, Apple)
   - Profile creation wizard for new users

### Nice-to-Have Features:
- **Swipe gestures** on profiles (like Tinder but for skills 😅)
- **Filter search results** by skills, location, availability
- **Dark mode** because my eyes hurt at night
- **Push notifications** when someone sends you an offer
- **Image upload** for profile pics and portfolio items
- **Better form validation** with more detailed error messages

### Code Improvements:
- **Tests!** I know, I know... I should've written tests
- **Better state management** - maybe Redux instead of useState everywhere
- **Custom hooks** to clean up repeated logic
- **Performance optimization** - the profile card rerenders a lot
- **Better TypeScript** - I used `any` in a few places and I'm not proud of it
- **Accessibility** - add proper labels and screen reader support

### UI Polish:
- **Skeleton loaders** instead of blank screens
- **Error states** with retry buttons
- **Empty states** with helpful messages
- **Smooth transitions** between pages
- **Micro-interactions** on buttons and cards
- **Toast notifications** for success/error messages

## Known Issues 

- The confetti animation sometimes stutters on Android
- If you refresh the search page, it redirects back to loading (intentional but might be annoying)
- The offer form doesn't actually send anything anywhere yet
- No error handling if images fail to load

## What I Learned

This was my first time:
- Using Expo Router (file-based routing is pretty cool!)
- Working with React Native Animated API
- Using haptic feedback

Struggled a bit with:
- Getting the loading screen to reveal the page underneath (not just show a black screen)
- Navigation timing issues (had to add mounting checks)
- TypeScript strict mode (but I'm glad I used it!)

## File Structure

```
app/
  ├── loading.tsx      # Animated loading + match reveal
  ├── search.tsx       # Match results page
  ├── matched.tsx      # Single match view
  └── [other pages]    # Placeholders for now

components/
  ├── ProfileCard.tsx  # Main profile display
  ├── AssetCard.tsx    # Portfolio items
  ├── AssetTag.tsx     # Color-coded skill badges
  ├── OfferForm.tsx    # Collaboration request modal
  └── BottomNav.tsx    # Navigation bar

data/
  └── seed.ts          # Mock data (would be API calls later)
```

## Resources I Used

- [Expo Docs](https://docs.expo.dev/) - for everything Expo related
- [React Native Animated](https://reactnative.dev/docs/animated) - learned animations from here
- Stack Overflow - you know... for when things broke 😅
- ChatGPT - helped debug some TypeScript errors

---

Built in a weekend for TTP Winter Immersion 2026 🚀

If you have questions, feel free to reach out!

