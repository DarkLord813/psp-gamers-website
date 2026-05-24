# Implementation Plan: Game-X Style Gaming Blog

Transform the gaming blog into a replica of the "Game-X" Blogger template aesthetic.

## Aesthetic Refinement
- **Color Palette**: 
    - Background: `#111111` (Deep Black)
    - Surface: `#1a1a1a` (Dark Gray)
    - Primary: `#a2ff00` (Electric Lime / Game-X Green)
    - Border: `#333333`
- **Typography**: Bold, uppercase headings for a "gaming" feel.

## Layout Structure
1. **Top Bar**: Social media links and date.
2. **Main Header**: Logo on left, navigation on right.
3. **Featured Hero**: A prominent featured post with a large image and text overlay.
4. **Main Content Area**:
    - Left Column (70%): Post grid (2 columns).
    - Right Column (30%): Sidebar with "Popular Posts", "Follow Us", and "Labels".
5. **Footer**: 3-column layout with site info and quick links.

## Functional Components
- `BloggerParser`: Reliable extraction of data from XML.
- `GameXNavbar`: Specific header styling.
- `FeaturedSlider`: Highlighted posts section.
- `GameXPostCard`: Card design matching Game-X (overlay tags, bold titles).
- `GameXSidebar`: Styled widgets for a authentic template feel.

## Technical Tasks
- Update `src/index.css` with Game-X theme variables.
- Rewrite `src/App.tsx` to implement the 2-column layout and hero section.
- Refine `src/lib/blogger-parser.ts` if needed (ensure category and date parsing is robust).
- Create `src/components/Sidebar.tsx`.
- Create `src/components/Hero.tsx`.
