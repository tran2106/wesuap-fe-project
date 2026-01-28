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

-------------------------------------------------------
# Prompt Log Entry - IndustryTag Component and Integration

## Goal
- Create a reusable tag component to display users' industry/skills with accessible color contrast and integrate into ProfileCard on the Search page using hard-coded data.

## Prompt
- "cretae a resuable component that is a tag to display user's skills industry on their profile card, keep them different colors for each industry, make sure the words on the tags is accessible to the user clearly importt this into profile cards using hard coded data. document the process in prompt_log"

## Result
- Implemented `components/IndustryTag.tsx` with typed industries and a color map ensuring readable foreground/background.
- Updated `components/ProfileCard.tsx` to render `IndustryTag` for the `skills` array.
- Added industry tags to `MOCK_PROFILES` in `app/search.tsx`.

## Edits / Verification
- Created `IndustryTag.tsx` with accessible colors and styles.
- Imported and rendered tags in `ProfileCard` under the bio.
- Hard-coded `skills` into mock profiles and verified tags render with distinct colors on the Search page.

-------------------------------------------------------
# Prompt Log Entry - Rename IndustryTag to SkillsTag

## Goal
- Rename the industry tag component to SkillsTag and update all usages to reflect skill tagging across profiles.

## Prompt
- "change this into skills tag name add to prompt log changes"

## Result
- Created `components/SkillsTag.tsx` mirroring the previous implementation but renamed types to `Skill` and component to `SkillsTag`.
- Updated `components/ProfileCard.tsx` to import and render `SkillsTag` and use `skills?: Skill[]`.
- Ensured mock profiles in `app/search.tsx` still render tags correctly.

## Edits / Verification
- Added `SkillsTag.tsx` with accessible color mappings.
- Replaced imports and types in `ProfileCard.tsx`.
- Verified tags render on the Search page for all profiles.

-------------------------------------------------------
# Prompt Log Entry - Expanded SkillsTag Palette

## Goal
- Replace IndustryTag with SkillsTag and support a large predefined list of skill tags with distinct, accessible colors.

## Prompt
- "i removed industry tag and skillstag.tsx will replace that file. For tags available i want to choose these fields [...] make sure to match the style to each unique tag document this in prompt_log.md"

## Result
- Updated `components/SkillsTag.tsx` to include all requested tag labels with a COLOR_MAP defining bg/fg/border for each and a readable fallback.

## Edits / Verification
- Edited `SkillsTag.tsx` types and COLOR_MAP; added fallback for unknown labels.
- Verified tags render with clear contrast on profile cards (via Search page mock data).

-------------------------------------------------------
# Prompt Log Entry - Search Profiles Updated to SkillsTag

## Goal
- Update the Search page to use the new SkillsTag labels and remove any previous industry-only tags.

## Prompt
- "update search.tsx with new profile cards with new tags that was introduced in skillstag.tsx, remove any tags that come from industry tags document this in prompt log"

## Result
- `app/search.tsx` now uses `skills` arrays with labels from `SkillsTag.tsx` and imports the `Skill` type for safety.

## Edits / Verification
- Replaced old labels with new ones: Web Development, Tech Support & Development, Coffee, Art & Design, Web Design, Marketing & Sales, Data, Professional Development, Networking.
- Imported `Skill` and annotated arrays `as Skill[]` to satisfy the union type.
- Verified the Search page renders cards with colored tags and no type errors.

-------------------------------------------------------
# Prompt Log Entry - Remove Headline from ProfileCard

## Goal
- Simplify the ProfileCard by removing the headline field while keeping bio and other info.

## Prompt
- "for profile card component, i want to remove the fields for headline, keep bio document this in prompt log"

## Result
- Updated `components/ProfileCard.tsx` to remove the `headline` field from the type and UI.
- Adjusted mock profiles in `app/search.tsx` to remove `headline` entries.

## Edits / Verification
- Edited ProfileCard to drop headline section and kept bio/skills tags.
- Verified Search page renders cards without type errors and layout remains consistent.

-------------------------------------------------------
# Prompt Log Entry - Resize SkillsTag

## Goal
- Make skills tags smaller so three fit on one line in ProfileCard.

## Prompt
- "can u resize the the skills tags a bit sma;ller so they fit all 3 in one line document in prompt log"

## Result
- Reduced tag padding (horizontal 8, vertical 4) and font size (11). Slightly smaller radius (12).

## Edits / Verification
- Updated `components/SkillsTag.tsx` styles.
- Verified in Search page cards that three tags fit per row under typical screen widths.

-------------------------------------------------------
# Prompt Log Entry - Revamp Search to Single Match View

## Goal
- Show one matched profile at a time with ability to navigate between matches, instead of listing all profiles.

## Prompt
- "so i did this part wrong, i was not dupposed to show a list of people i matched with but just a single profile i get matched with and i can swap back and forth bettween other matches, can you clean up my code to revamp this issue so each person i match with get their own big component page instead of a list docment this in prompt log"

## Result
- Updated `app/search.tsx` to display one `ProfileCard` at a time with Prev/Next buttons, showing current index out of total.

## Edits / Verification
- Replaced ScrollView list with stateful `index` and navigation controls.
- Verified toggling between three mock matches updates the card.
- Kept BottomNav at the bottom.

-------------------------------------------------------
# Prompt Log Entry - Add Sample Assets to Search Profiles

## Goal
- Display asset cards on matched profiles to clarify teachable skills.

## Prompt
- "add Add sample assets to your mock profile in app/search.tsx document in prompt -log"

## Result
- Added `assets` arrays to mock profiles in `app/search.tsx` with title, description, tag, portfolio link, optional image, and socials.
- AssetCard now renders within ProfileCard for each asset.

## Edits / Verification
- Updated `MATCHES` mock data with realistic assets for Alex, Maya, and Samir.
- Verified on the Search page that assets display with tag, CTA, optional image placeholder, and social icons.

-------------------------------------------------------
# Prompt Log Entry - Remove Asset Placeholder & Responsive Card

## Goal
- Ensure assets load directly under bio and make the profile card adapt to screen sizes.

## Prompt
- "document in prompt -log, in profile card remove the blank space in under bio and on top of asset so asset can load properly, let profile card size changable based on screen size document this in prompt_log"

## Result
- Removed the assets placeholder from `components/ProfileCard.tsx` so assets render immediately below bio.
- Adjusted card sizing: width 92% with maxWidth 480 and added `rowGap` for responsive spacing.

## Edits / Verification
- Edited `ProfileCard.tsx` to delete the placeholder and tweak styles.
- Verified assets appear directly after bio and the card scales on different device widths.

