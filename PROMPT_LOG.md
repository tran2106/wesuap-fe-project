# Prompt Log Template

## Goal
- What you were trying to achieve.

## Prompt
- Exact prompt used (copy/paste).
- Context/files referenced.

## Result
- What you got back.
- Observed behavior (screenshots, errors, outputs).

## Edits / Verification
- What you changed (files, routes, components).
- How you validated (steps, commands, tests).
- Outcome after changes.

-------------------------------------------------------
## Goal
- Create a reusable card component to display a user's profile (display name, location, bio, profile picture) and use it on the Search page.

## Prompt
- "Under the components directory, create a reusable card component that displays a user’s profile information, including their display name, location, bio, and profile picture. hard code a few profiles with full data and import it into the search page component under tabs. Document this prompt into the prompt-log.md file"

## Result
- A new `ProfileCard` component was created with styled avatar, name, location, and bio.
- Three mock profiles were added and rendered on the `SearchPage` above the bottom nav.

## Edits / Verification
- Created `components/ProfileCard.tsx` with `Profile` type and a card layout.
- Updated `app/search.tsx` to import `ProfileCard`, defined `MOCK_PROFILES`, and rendered the list in a `ScrollView`.
- Verified by running the app and navigating to the Search page; cards display with avatars and text.
- Ensured scrollable content has `paddingBottom` so it doesn’t get covered by the bottom nav.

-------------------------------------------------------
# Prompt Log Entry - ProfileCard News Feed Redesign

## Goal
- Redesign ProfileCard to look like a news-feed post card: circular avatar left, smaller name/location, headline text, skill tags space, and a right-aligned "Send Offer" button.

## Prompt
- "adjust profile card, i want it in a format of post cards on news feed, user profile picture should maintain circular shape and more towards the left, name and locations should be a bit smaller, headline and i want leave spaces for skill tags under ,all the way to the right, make a button to send an offer"

## Result
- Updated `components/ProfileCard.tsx` with new layout:
  - Circular avatar (60x60) anchored left.
  - Smaller name (16) and location (12).
  - Optional `headline` above bio.
  - Skill tags row supports `skills: string[]`.
  - Right-aligned orange "Send Offer" button.

## Edits / Verification
- Edited `components/ProfileCard.tsx`: added `headline` and `skills` fields to `Profile` type; restructured layout; added styles.
- Verified card renders in `app/search.tsx` by viewing mock profiles.
- Checked avatar remains circular and button aligns to the right.

