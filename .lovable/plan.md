

## Plan: Restructure About Page with Personal Founders Story

### What changes

The page structure will be reordered so the **first section after the hero** tells the personal story of two young farmers who experienced the workforce shortage firsthand. The crisis data/statistics section moves **after** the founders' story, providing evidence to back up what they witnessed.

### New page flow

```text
1. Hero (keep as-is)
2. NEW — "Our Origin" / founders section (personal story of two young men)
3. Crisis data + statistics (existing, moved down)
4. Solution section (keep)
5. Mission / Vision / Values (keep)
6. What We Do (keep)
7. CTA (keep)
8. Footer (keep)
```

The current "Our Story" section (lines 157-172) will be **removed** and replaced by the new founders section placed right after the hero.

### Changes by file

**`src/contexts/LanguageContext.tsx`**
- Update `about.subtitle` to reference the founders personally
- Add new keys: `about.foundersTitle`, `about.foundersP1`, `about.foundersP2`, `about.foundersP3` — telling the story of two young farmers who lived the hiring struggle, saw neighbors leave for cities, and decided to build a solution
- Remove or repurpose the old `about.ourStory`, `about.storyP1`, `about.storyP2` keys

**`src/pages/About.tsx`**
- Insert a new "Founders" section immediately after the hero, before the crisis section — featuring a warm design with a `Users` or similar icon, and 2-3 paragraphs of the personal narrative
- Remove the old "Our Story" section (lines 157-172)
- Keep everything else in the same order

### Content direction (both languages)

The founders section will convey:
1. Two young men who grew up working on farms and saw firsthand how hard it was to find reliable workers — and how good workers struggled to find opportunities
2. They watched friends and neighbors leave for the cities, weakening rural communities
3. They decided to use technology to bridge this gap, creating Trampo no Campo

