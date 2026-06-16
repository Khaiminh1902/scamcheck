# Design System Inspired by Cosmos

## 1. Visual Theme & Atmosphere

Cosmos embodies a minimalist, inspiration-focused aesthetic with an emphasis on clarity and refined simplicity. The design system exudes a sense of openness and creative space through generous whitespace, soft typography, and carefully balanced contrast. Drawing from nature-inspired tones (soft teals, warm neutrals), the interface creates a contemplative yet welcoming environment that encourages exploration and discovery. The visual language prioritizes accessibility and legibility while maintaining an elevated, sophisticated tone through measured use of color and subtle depth.

**Key Characteristics**

- Minimalist, spacious layout with breathing room
- Soft, muted color palette balanced with deep neutrals
- Refined typography with elegant proportions
- Accessible contrast ratios prioritizing readability
- Subtle elevation and shadow treatments
- Nature-inspired accent colors (sage greens, warm terracottas)
- Rounded, generous button treatments (fully rounded)
- Clean, uncluttered information hierarchy

## 2. Color Palette & Roles

### Primary

- **Black** (`#0D0D0D`): Primary text, primary button text, core UI elements
- **Off-Black** (`#000000`): Secondary text emphasis, deep interactive states
- **Pure White** (`#FFFFFF`): Primary background, text on dark surfaces, card backgrounds

### Accent Colors

- **Lavender** (`#D2BEFF`): Accent highlight, decorative accents, interactive states
- **Terracotta** (`#EF7759`): Secondary accent, warm highlights, emphasis states
- **Warm Beige** (`#EAC7A0`): Tertiary accent, soft highlights, alternative emphasis
- **Sage Taupe** (`#A4A38F`): Muted accent, subtle decorative use

### Interactive

- **Error Red** (`#BD3C1F`): Error states, destructive actions, validation failure
- **Error Red Alt** (`#BC361B`): Error emphasis, critical alerts
- **Rust** (`#D1543E`): Error alternative, warning contexts

### Neutral Scale

- **Off-White** (`#F7F5F3`): Subtle backgrounds, card surfaces, reduced contrast areas
- **Light Gray** (`#E8E6E4`): Border colors, dividers, subtle separation
- **Charcoal** (`#141414`): Deep text, strong contrast
- **Dark Gray** (`#212020`): Secondary text, muted foreground
- **Mid Gray** (`#323131`): Tertiary elements, disabled states

### Surface & Borders

- **Light Border** (`#0003`): Subtle borders, 12% opacity overlay on light backgrounds
- **Transparent White** (`#FFF0`): Transparent surface overlay, overlay backgrounds

### Shadow & Depth

- **Dark Shadow** (`#0D0D0D`): Primary shadow source for elevation
- **Deep Accent** (`#302F47`): Rich overlay color for video/media elements

## 3. Typography Rules

### Font Family

**Primary**: cosmosOracle (serif/display font for premium aesthetic) with fallback `Georgia, serif`
**Secondary**: cosmosOracle (unified typography system across all sizes)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display 1 (H1) | cosmosOracle | 74px | 350 | 74px | 0px | Large hero headline, page title |
| Display 2 (H2) | cosmosOracle | 66px | 400 | 71.28px | 0px | Secondary headline, major sections |
| Heading 3 | cosmosOracle | 48px | 400 | 56px | 0px | Section headings (inferred) |
| Body Large | cosmosOracle | 16px | 500 | 20px | 0px | Primary body text, link text |
| Body Regular | cosmosOracle | 14px | 500 | 18px | 0px | UI labels, button text |
| Body Small | cosmosOracle | 14px | 400 | 18px | 0px | Input placeholder, smaller UI text |
| Span/Accent | cosmosOracle | 14px | 500 | 18px | 0px | Supplementary text, metadata |
| Link | cosmosOracle | 16px | 400 | 24px | 0px | Navigation links, inline links |
| Caption | cosmosOracle | 12px | 400 | 16px | 0px | Helper text, footnotes (inferred) |

### Principles

- **Unified Font Family**: All typography uses cosmosOracle for consistency and premium feel
- **Light Weights for Elegance**: Display text uses 350–400 weight for refined hierarchy
- **Generous Line Heights**: Line heights exceed 1.5x font size for improved readability
- **Minimal Letter Spacing**: Default letter spacing maintained at 0px for sophisticated appearance
- **Optical Sizing**: Font sizes chosen to create clear visual hierarchy and distinction
- **Accessibility First**: Sufficient contrast maintained across all text colors and backgrounds

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background**: `#F7F5F3` (light off-white)
- **Text Color**: `#EF7759` (terracotta)
- **Font Size**: `14px`
- **Font Weight**: `500`
- **Padding**: `0px 16px`
- **Height**: `54px`
- **Border Radius**: `9999px` (fully rounded)
- **Border**: `1px solid rgba(0, 0, 0, 0.12)` (subtle dark border)
- **Box Shadow**: `none`
- **Line Height**: `18px`
- **Hover State**: Background opacity increase to `#F0EEE9`, text color deepens
- **Active State**: Background `#E8E6E4`, text color `#D1543E`
- **Disabled State**: Background `#E8E6E4`, text color `#A8A8A0`, opacity `0.5`

#### Secondary Button (Outline)
- **Background**: `transparent`
- **Text Color**: `#0D0D0D` (black)
- **Font Size**: `16px`
- **Font Weight**: `400`
- **Padding**: `16px 24px`
- **Height**: `56px`
- **Border Radius**: `9999px` (fully rounded)
- **Border**: `1px solid rgba(0, 0, 0, 0.12)` (subtle dark border)
- **Box Shadow**: `none`
- **Line Height**: `20px`
- **Hover State**: Background `rgba(0, 0, 0, 0.04)`, border darkens to `rgba(0, 0, 0, 0.2)`
- **Active State**: Background `rgba(0, 0, 0, 0.08)`, text darkens to `#000000`

#### Ghost Button (Icon Button)
- **Background**: `transparent`
- **Text Color**: `#0D0D0D` (black)
- **Font Size**: `14px`
- **Font Weight**: `500`
- **Padding**: `0px`
- **Height**: `38px`
- **Width**: `38px`
- **Border Radius**: `9999px` (fully rounded)
- **Border**: `none`
- **Box Shadow**: `none`
- **Line Height**: `18px`
- **Hover State**: Background `rgba(0, 0, 0, 0.06)`, scale `1.05`
- **Active State**: Background `rgba(0, 0, 0, 0.12)`, scale `0.95`

#### CTA Link Button
- **Background**: `#F7F5F3` (light off-white)
- **Text Color**: `#0D0D0D` (black)
- **Font Size**: `16px`
- **Font Weight**: `400`
- **Padding**: `0px`
- **Height**: `54px`
- **Width**: `54px`
- **Border Radius**: `9999px` (fully rounded)
- **Border**: `1px solid rgba(0, 0, 0, 0.12)`
- **Box Shadow**: `none`
- **Line Height**: `24px`
- **Hover State**: Background `#F0EEE9`

#### Text Link
- **Background**: `transparent`
- **Text Color**: `#EF7759` (terracotta)
- **Font Size**: `14px`
- **Font Weight**: `500`
- **Padding**: `0px`
- **Border Radius**: `0px`
- **Border**: `none`
- **Box Shadow**: `none`
- **Line Height**: `18px`
- **Hover State**: Text color `#D1543E`, underline appears
- **Active State**: Text color `#BD3C1F`
- **Visited State**: Text color `#A4A38F`

### Cards & Containers

#### Card Base
- **Background**: `#FFFFFF` (white)
- **Border**: `1px solid #E8E6E4` (light gray)
- **Border Radius**: `16px`
- **Padding**: `24px`
- **Box Shadow**: `rgba(0, 0, 0, 0.15) 0px 6px 44px 0px, rgba(0, 0, 0, 0.03) 0px 4px 8px 0px`
- **Hover Shadow**: `rgba(0, 0, 0, 0.2) 0px 12px 48px 0px, rgba(0, 0, 0, 0.05) 0px 6px 12px 0px`

#### Media Card (Video/Hero Container)
- **Background**: `linear-gradient(135deg, #6B9A8E 0%, #3D5A5A 100%)`
- **Border Radius**: `20px`
- **Padding**: `0px`
- **Box Shadow**: `rgba(0, 0, 0, 0.15) 0px 6px 44px 0px`
- **Overlay**: `rgba(48, 47, 71, 0.15)` (deep accent overlay at 15% opacity)
- **Aspect Ratio**: `16 / 9` (inferred from hero layout)

#### Section Container
- **Background**: `#FFFFFF` or `#F7F5F3` (alternating)
- **Padding**: `64px 32px`
- **Max Width**: `1200px` (inferred)
- **Margin**: `0 auto`

### Inputs & Forms

#### Text Input
- **Background**: `transparent`
- **Border**: `0px`
- **Border Bottom**: `1px solid rgba(0, 0, 0, 0.2)` (underline only)
- **Text Color**: `#0D0D0D` (black)
- **Font Size**: `14px`
- **Font Weight**: `400`
- **Padding**: `8px 0px`
- **Height**: `auto` (line height based)
- **Line Height**: `18px`
- **Placeholder Color**: `rgba(0, 0, 0, 0.5)`
- **Focus State**: Border bottom `2px solid #EF7759`, background `rgba(239, 119, 89, 0.02)`
- **Error State**: Border bottom `2px solid #BD3C1F`, text color `#BD3C1F`

#### Search Input
- **Background**: `rgba(0, 0, 0, 0.04)`
- **Border**: `1px solid rgba(0, 0, 0, 0.12)`
- **Border Radius**: `24px`
- **Text Color**: `#0D0D0D`
- **Font Size**: `14px`
- **Padding**: `8px 16px`
- **Height**: `40px`
- **Placeholder Color**: `rgba(0, 0, 0, 0.4)`
- **Focus State**: Border `1px solid #EF7759`, background `rgba(0, 0, 0, 0.02)`

### Navigation

#### Navigation Bar
- **Background**: `#FFFFFF`
- **Border Bottom**: `1px solid #E8E6E4` (light separator)
- **Padding**: `16px 32px`
- **Height**: `64px`
- **Display**: `flex`
- **Justify Content**: `space-between`
- **Align Items**: `center`

#### Navigation Link
- **Text Color**: `#0D0D0D` (black)
- **Font Size**: `14px`
- **Font Weight**: `500`
- **Padding**: `8px 16px`
- **Border Radius**: `6px`
- **Hover State**: Background `rgba(0, 0, 0, 0.06)`, text color `#EF7759`
- **Active State**: Text color `#EF7759`, underline `2px solid #EF7759`

#### Logo Button
- **Background**: `transparent`
- **Width**: `38px`
- **Height**: `38px`
- **Display**: `flex`
- **Align Items**: `center`
- **Justify Content**: `center`

## 5. Layout Principles

### Spacing System

**Base Unit**: `4px`

**Scale Usage**:
- `4px`: Minimal gaps between tightly grouped elements
- `8px`: Internal padding for compact components
- `12px`: Spacing between form fields, tight groupings
- `16px`: Standard horizontal gaps between UI sections
- `20px`: Gap between moderate sections
- `24px`: Padding within cards and contained sections
- `32px`: Large padding, section separation
- `40px`: Gap between major layout sections
- `56px`: Margin between distinct page regions
- `60px`: Large vertical spacing
- `64px`: Section top/bottom padding, major breaks
- `72px`: Maximum gap for hero sections and page divisions

### Grid & Container

- **Max Width**: `1200px` (inferred from screenshot proportions)
- **Column Strategy**: 12-column flexible grid (inferred)
- **Section Padding**: `64px` vertical, `32px` horizontal
- **Container Margins**: Centered with `0 auto`
- **Breakpoint Columns**: Desktop 12 cols → Tablet 6 cols → Mobile 1–2 cols

### Whitespace Philosophy

Cosmos prioritizes abundant whitespace as a core design principle. Large vertical spacing (`64px` sections) creates breathing room and visual hierarchy. Horizontal padding (`32px`) maintains comfortable reading width. Internal padding within components (`24px` cards) provides visual separation without cramping content. This generous approach reflects the brand's philosophy of creating "a space for inspiration"—both literally and visually.

### Border Radius Scale

- `0px`: Text links, underline elements, utility dividers
- `6px`: Navigation links, subtle interactive areas
- `16px`: Standard card radius, medium containers
- `20px`: Video/media cards, larger hero elements
- `24px`: Large input fields, prominent modals (inferred)
- `9999px`: Fully rounded buttons (pill style), icon buttons, CTAs

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (No Shadow) | `none` | Buttons, text links, minimal UI elements |
| Raised (Subtle) | `rgba(0, 0, 0, 0.03) 0px 4px 8px 0px` | Input fields, small overlays |
| Elevated (Medium) | `rgba(0, 0, 0, 0.15) 0px 6px 44px 0px, rgba(0, 0, 0, 0.03) 0px 4px 8px 0px` | Standard cards, modals |
| Prominent (Deep) | `rgba(0, 0, 0, 0.2) 0px 12px 48px 0px, rgba(0, 0, 0, 0.05) 0px 6px 12px 0px` | Hero cards, key containers on hover |
| Overlay | `rgba(48, 47, 71, 0.15)` | Video overlays, hero media elements |

**Shadow Philosophy**: Cosmos employs subtle, naturalistic shadows that enhance perceived depth without creating harsh contrast. The dual-shadow system (outer blur + inner soft) mimics soft light diffusion. Shadows appear primarily on cards and elevated surfaces, while buttons and minimal UI remain flat. This restraint maintains the clean, minimalist aesthetic while providing visual hierarchy.

## 7. Do's and Don'ts

### Do

- Use fully rounded buttons (`border-radius: 9999px`) for all primary CTAs
- Maintain generous spacing (`32px` horizontal, `64px` vertical) between major sections
- Apply the soft shadow system (`6px 44px` with `15%` opacity) to elevated card elements
- Stick to the cosmosOracle font family across all typography scales
- Use terracotta (`#EF7759`) for interactive states and hover effects
- Prioritize `#FFFFFF` and `#F7F5F3` for backgrounds to maintain clarity
- Include subtle borders (`rgba(0, 0, 0, 0.12)`) on outlined buttons and cards
- Implement single-line underline text inputs with bottom borders only
- Align content to a centered `1200px` max-width container
- Use error red (`#BD3C1F`) consistently across validation and destructive states

### Don't

- Use hard shadows or high-contrast drop shadows that distract from content
- Apply multiple accent colors in close proximity without clear hierarchy
- Condense spacing below `16px` for section-level gaps
- Mix font families; cosmosOracle should remain the sole typeface
- Use pure black (`#000000`) on light backgrounds without testing contrast ratios
- Apply border-radius below `6px` to interactive elements (too sharp)
- Combine multiple accent colors (lavender + terracotta) without clear visual separation
- Use overly saturated or warm tones that clash with nature-inspired palette
- Create buttons with padding exceeding `24px` horizontally
- Ignore hover and active states for interactive elements

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|------------|
| Mobile | 320px–639px | Single column, `16px` side padding, `32px` section spacing, font sizes scale down 10%, buttons `width: 100%` |
| Tablet | 640px–1023px | 2-column grid, `24px` side padding, `48px` section spacing, card layout becomes scrollable row |
| Desktop | 1024px–1440px | 12-column grid, `32px` side padding, `64px` section spacing, full card visibility |
| Wide | 1440px+ | Centered `1200px` max-width container, `32px` side padding maintained |

### Touch Targets

- **Minimum Button Height**: `54px` (based on design tokens)
- **Minimum Button Width**: `54px` for icon buttons
- **Minimum Link/Text Target**: `44px` height (WCAG AA inferred)
- **Minimum Spacing Between Targets**: `8px` minimum gap
- **Search Input Height**: `40px` (from extracted tokens)

### Collapsing Strategy

- **Navigation**: Menu collapses to hamburger icon below `640px`; Navigation links stack vertically
- **Hero Section**: H1 font size reduces from `74px` to `48px` on tablet, `36px` on mobile
- **Card Layouts**: Cards display in 2-column rows (tablet) then stack to 1 column (mobile)
- **Spacing**: Section padding reduces from `64px` to `48px` (tablet), `32px` (mobile)
- **Container**: Max-width remains `1200px` until `1024px` breakpoint; collapses to viewport on mobile
- **Buttons**: Full-width buttons on mobile (`width: 100%`), fixed widths on desktop
- **Modals**: Take `90vw` width on mobile, `80vw` on tablet, fixed `600px` on desktop

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA Button**: Terracotta (`#EF7759`) text on Off-White (`#F7F5F3`) background
- **Secondary Button**: Black (`#0D0D0D`) text with subtle border on transparent
- **Primary Background**: Pure White (`#FFFFFF`)
- **Secondary Background**: Off-White (`#F7F5F3`)
- **Heading Text**: Black (`#0D0D0D`)
- **Body Text**: Black (`#0D0D0D`) at `16px`, weight `500`
- **Accent Highlights**: Lavender (`#D2BEFF`) for decorative elements
- **Error States**: Error Red (`#BD3C1F`)
- **Borders**: Light Gray (`#E8E6E4`) or subtle dark overlay (`rgba(0, 0, 0, 0.12)`)
- **Navigation Links**: Black (`#0D0D0D`) default, Terracotta (`#EF7759`) on hover

### Iteration Guide

1. **All buttons use fully rounded corners** (`border-radius: 9999px`), never sharp corners or light radius values
2. **Typography unifies on cosmosOracle font family** across all sizes; no font mixing
3. **Section spacing follows the scale**: `32px` horizontal padding, `64px` vertical padding minimum
4. **Cards elevate with dual-shadow system**: `rgba(0, 0, 0, 0.15) 0px 6px 44px 0px` + `rgba(0, 0, 0, 0.03) 0px 4px 8px 0px`
5. **Interactive states use Terracotta** (`#EF7759`) for hover/active foreground colors
6. **Borders are subtle**: Always use `rgba(0, 0, 0, 0.12)` or `#E8E6E4` for soft, refined appearance
7. **Input fields use underline-only borders** (bottom border only, `1px solid`) on transparent backgrounds
8. **Max-width container is 1200px** centered with auto margins
9. **Whitespace is prioritized**: Never crowd elements; use generous gaps aligned to the spacing scale
10. **Error/danger communicates via** `#BD3C1F` consistently across validation, alerts, and destructive actions