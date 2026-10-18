# TinySteps — Product & Design System

**Purpose:** Shared design reference for Google Stitch and anyone designing or implementing TinySteps.

**Product tagline:** Little routines. Less mental load.

**Status:** Initial design direction for an MVP. This is a flexible starting point, not a rigid or unchangeable design system.

---

## 1. Product overview

TinySteps is a calm, mobile-first baby routine tracker for parents and caregivers of newborns. It helps them record daily events and review them later without having to remember everything.

### MVP activities
- **Feeding:** breastfeeding or bottle feeding; optional amount in milliliters; optional side/duration details for breastfeeding; notes and time.
- **Sleep:** start an active sleep session, stop it when the baby wakes, or manually enter a completed session.
- **Diaper:** wet, dirty, or mixed; time and optional notes.
- **Daily timeline:** ordered list of all saved events with edit and delete actions.
- **Baby profile:** baby nickname/name, date of birth, optional avatar, and preferences relevant to the app.
- **History:** browse previous days and filter events by type.
- **Settings:** light/dark/system theme preference and basic data/privacy preferences.

### Product principles
1. **Fast during a busy day.** Common actions should take as few taps as practical.
2. **Designed for one hand.** Prioritize touch-friendly controls, clear hierarchy, and bottom navigation on narrow screens.
3. **Calm, never clinical.** This is a routine logger, not a medical dashboard.
4. **Helpful, not judgmental.** Avoid streak pressure, guilt-inducing copy, red warning styling for ordinary missed logs, or language implying that parents are failing.
5. **Readable at a glance.** Times, event types, durations, and quantities should be easy to scan.
6. **Honest with information.** Distinguish sample data, user-entered data, and active timers. Never invent an event or present routine totals as a medical assessment.
7. **Accessible by default.** Clear contrast, visible focus, keyboard support, sufficiently large touch targets, and reduced-motion support.

### Out of scope for the first MVP
- Diagnoses, medical recommendations, growth/development assessments, or claims that a baby is healthy based on logs.
- Medication dosing or clinical decision support.
- Social feeds, gamification, achievement streaks, and unnecessary charts.
- Complicated multi-child management unless it becomes a product requirement. The design may leave room for a future baby switcher without making it prominent in the MVP.

---

## 2. Visual direction

### Overall feel
Create a polished, warm, modern family-care app. It should feel premium, reassuring, clear, and quietly friendly—not like a toy, cartoon, hospital portal, or generic admin template.

Use restrained rounded shapes, generous whitespace, subtle borders, a few soft accent surfaces, and simple line icons. Small editorial illustrations can be used sparingly in onboarding or empty states. The main dashboard should prioritize utility over decoration.

**No existing brand or fixed visual system is being inherited.** Use this guide to establish a coherent first direction, but treat values as semantic starting tokens. Refine layouts when the content, screen size, or usability calls for it. Do not force every page into the same card layout or add decoration just to make screens look identical. Consistency means the same interaction language and visual personality—not identical compositions everywhere.

### Brand personality
- Gentle, grounded, thoughtful, encouraging.
- Friendly but not overly cute.
- Quiet confidence, with no visual pressure or excessive notifications.
- Clear and practical for a tired parent using a phone.

### Suggested colour tokens
Use semantic names so both themes are complete and coordinated. The hex values below are starting points and may be tuned for contrast and visual balance.

#### Light theme
| Token | Starting value | Use |
|---|---|---|
| `background` | `#F7F6F1` | Main app background; warm off-white |
| `surface` | `#FFFFFF` | Main cards, dialogs, inputs |
| `surface-subtle` | `#F0F1EA` | Secondary panels, icon containers |
| `surface-raised` | `#FFFFFF` | Menus, popovers, elevated surfaces |
| `text-primary` | `#26312B` | Main headings and body text |
| `text-secondary` | `#69746C` | Supporting text and metadata |
| `border` | `#E1E5DC` | Dividers, inputs, card outlines |
| `primary` | `#587A66` | Primary actions and selected states |
| `primary-hover` | `#476653` | Primary action hover/pressed state |
| `primary-soft` | `#E5EEE7` | Tinted primary surfaces |
| `accent` | `#D9957E` | Small highlights and selected illustrations |
| `accent-soft` | `#F7E8E1` | Gentle peach backgrounds |
| `success` | `#42765B` | Confirmations only; pair with text/icon |
| `warning` | `#946A34` | Non-urgent caution where genuinely needed |
| `danger` | `#B94F4F` | Destructive actions and errors only |

#### Dark theme
| Token | Starting value | Use |
|---|---|---|
| `background` | `#141916` | Main app background; avoid pure black |
| `surface` | `#1C241F` | Main cards, dialogs, inputs |
| `surface-subtle` | `#242E27` | Secondary panels and icon containers |
| `surface-raised` | `#29342D` | Menus, popovers, elevated surfaces |
| `text-primary` | `#F1F4EE` | Main headings and body text |
| `text-secondary` | `#B0BBB1` | Supporting text and metadata |
| `border` | `#354239` | Dividers, inputs, card outlines |
| `primary` | `#A6C7AF` | Primary actions and selected states; verify button contrast |
| `primary-hover` | `#BDD8C4` | Primary action hover/pressed state |
| `primary-soft` | `#293B30` | Tinted primary surfaces |
| `accent` | `#E8AA94` | Small highlights and selected illustrations |
| `accent-soft` | `#3A2A25` | Gentle peach backgrounds |
| `success` | `#9ED0AD` | Confirmations only; pair with text/icon |
| `warning` | `#E3BE7A` | Non-urgent caution where genuinely needed |
| `danger` | `#F0A0A0` | Destructive actions and errors only |

Do not rely on colour alone to convey meaning. Keep body text and functional text comfortably legible. Check contrast in both themes, including hover, disabled, focus, and selected states.

### Typography
- **Primary font:** Montserrat, with a system sans-serif fallback.
- Use a clear, approachable hierarchy; avoid overly thin weights and very small labels.
- Page title: approximately 28–32 px desktop, 24–28 px mobile.
- Section title: approximately 18–22 px.
- Body: approximately 14–16 px; default to 16 px where possible.
- Metadata/captions: approximately 12–14 px, still legible and high contrast.
- Use tabular numerals for times, durations, and quantities when supported.
- Keep line lengths comfortable and avoid dense paragraphs in the dashboard.

### Layout, spacing, and shape
- Use a consistent 4 px spacing scale as a reference, not a hard rule for every element.
- Main content maximum width: approximately 1200–1360 px on wide desktop displays.
- Desktop: a compact left sidebar may be used for primary navigation, with a clear content area and optional right-side detail only when useful.
- Tablet: collapse or narrow the sidebar when space becomes constrained.
- Mobile: use a single-column layout and a persistent bottom navigation bar where appropriate. Reserve bottom space so the nav never covers the last content item or primary action.
- Card radius: generally 14–20 px. Inputs/buttons: generally 10–14 px. Full-screen/modal panels may use 20–24 px where appropriate.
- Prefer subtle 1 px borders and restrained shadows over heavy shadows, glassmorphism, or intense gradients.
- Do not put every small element inside its own card. Use spacing and typography to establish hierarchy.

### Iconography and imagery
- Prefer consistent, simple outline icons (Lucide-like style) with consistent stroke weight.
- Use icons alongside text for important actions; do not make essential actions icon-only unless the accessible name and tooltip are present.
- Use subtle, tasteful baby-related illustrations only where they improve warmth or explain an empty state. Avoid stock-photo-heavy dashboard screens, random decorative blobs, or a childish cartoon aesthetic.
- Do not use emoji as the primary icon system.

---

## 3. Theme behaviour

Both **light and dark modes are first-class themes**. Design, review, and generate each relevant screen in both themes. Dark mode is not simply a colour-inverted light screen; preserve elevation, hierarchy, input boundaries, and legibility.

Provide a theme preference with three options where practical:
- Light
- Dark
- System

Persist the explicit user preference. When `System` is selected, follow the operating-system preference. Avoid a flash of the wrong theme during initial load. Ensure dialogs, dropdowns, tooltips, charts, skeletons, toasts, and navigation also adapt to both themes.

Do not use the light theme as the only reference. Every Stitch screen prompt should request both variants unless a particular task is explicitly about only one theme.

---

## 4. Motion and interaction design

The whole app should feel responsive and polished through small, purposeful transitions. Motion should clarify a state change, direct attention, or provide feedback—not delay a parent from logging an event.

### Motion principles
- Use movement sparingly and consistently.
- Prefer animating `opacity` and `transform` over properties that trigger layout work.
- Avoid constant floating animations, pulsing dashboards, bouncing numbers, exaggerated spring motion, and long intro sequences.
- Keep interactions immediate. Never delay the result of a log action just to play an animation.
- Respect the platform's reduced-motion preference; remove or minimize non-essential motion when reduced motion is enabled.

### Motion tokens (starting points)
| Motion | Duration | Behaviour |
|---|---:|---|
| Hover/focus colour and border | 140–180 ms | Smooth colour/border change |
| Button press | 100–140 ms | Subtle scale to about `0.98`, then return |
| Small icon feedback | 140–200 ms | Opacity or slight scale; no spin by default |
| Card/list item entrance | 180–240 ms | Fade in with a slight 4–8 px rise |
| Staggered list entrance | 30–50 ms between items | Use only for initial reveal, not every refresh |
| Dialog/sheet entrance | 180–240 ms | Fade backdrop; fade/scale panel from roughly `0.98` |
| Toast entrance/exit | 180–220 ms | Short fade and slight vertical movement |
| Page transition | 180–240 ms | Subtle fade and minimal movement; never create a slow-feeling app |
| Skeleton shimmer | 1.2–1.6 s loop | Very subtle; stop when content loads and respect reduced motion |
| Theme transition | 180–240 ms | Smooth background, surface, border, and text-colour transitions without animating layout |

These are guidelines, not rigid requirements. Do not animate every element simply because a token exists.

### Required motion/interaction states
- Buttons: hover, focus-visible, active/pressed, disabled, loading.
- Navigation: clear active state plus a subtle transition.
- Dialogs/drawers: enter/exit motion, backdrop, correct focus handling, and clear close action.
- Form controls: focus, validation, disabled, saving, and success states.
- Logging an event: immediate feedback, timeline update, and a brief toast or inline confirmation.
- Active sleep session: clear running status and elapsed duration; do not create distracting continuously moving UI.
- Theme switch: smooth colour change, no page reload.
- Empty/loading/error states: calm transitions that do not flash or shift the whole page unexpectedly.

### Reduced motion
Use `prefers-reduced-motion` support. With reduced motion enabled, remove non-essential movement, large transforms, and staggered entrances. Keep state changes understandable through immediate visual updates, borders, icons, or text.

---

## 5. Core UX patterns

### Quick logging
- Keep the three main actions visible: Feeding, Sleep, Diaper.
- Make the tap targets generous and comfortably separated.
- Use clear labels. Do not depend on icon recognition alone.
- After saving, return users to the context they came from and show a small confirmation.
- Preserve entered values if validation fails.
- Ask only for information needed for the selected routine; notes and extra detail are optional.

### Timeline entries
Each entry should make the event type, time, and key detail easy to scan. Use a compact row on mobile and may use a slightly richer layout on desktop. Include a non-disruptive edit/delete menu. Destructive actions require confirmation or a safe undo pattern.

### Forms
- Use explicit labels; do not rely on placeholders as labels.
- Group related controls logically.
- Display units directly beside quantities, such as `ml`.
- Make optional fields visibly optional.
- Validate gently and show the issue close to the field.
- Avoid alarm-red styling except for actual errors or destructive actions.

### Dates and time
- Display dates in a friendly readable format while keeping actual timestamps unambiguous in detailed views.
- Clearly label the current day and selected historical day.
- The timeline should sort events consistently by time.
- If users can manually backdate an event, make the chosen date/time clear before saving.

### Data states that must be designed
- Brand-new user with no baby profile.
- Baby profile exists but no events today.
- Day with several events.
- Active sleep session.
- Empty history for a selected date/filter.
- Form validation error.
- Save in progress and save success.
- Load failure/retry.
- Delete confirmation/undo.
- Offline or unsaved state only if implemented by the product.

### Content and tone
Use short, calm, supportive English copy in the initial design. Avoid shame, urgency, unsupported medical implications, and overly sentimental copy. Example tone: “A little note for today”, “Nothing logged yet”, “Add your first routine”, and “Saved to today’s timeline”.

Never imply that a particular number of feeds, naps, or diaper changes proves the baby is healthy. Routine totals are descriptive records, not diagnoses.

---

## 6. Responsive and accessible design

- Start with mobile screens around 360–390 px wide, then tablet and desktop.
- Ensure forms work on small screens without horizontal scrolling.
- Keep important actions reachable and do not cover content with bottom navigation or sticky controls.
- Use semantic headings and sensible reading order.
- Provide visible keyboard focus and keyboard-operable navigation, menus, dialogs, and forms.
- Aim for WCAG AA colour contrast for text and functional controls.
- Use meaningful accessible names for icon buttons.
- Do not use colour as the only indicator of event type, validation, or active state.
- Respect reduced-motion settings.
- Provide an adequate touch target; aim for around 44 × 44 px where practical.

---

## 7. Stitch instructions

When generating or revising a TinySteps screen in Stitch:

1. Treat this file as the shared project reference. The screen-specific prompt determines the content and unique layout; this file determines the product personality, shared tokens, theme behaviour, accessibility, and motion language.
2. Use **Google Stitch** to explore and iterate on screens. Do not interpret the tokens as a reason to repeat the same composition on every page.
3. For each screen, create desktop and mobile layouts and both light and dark theme variants. If generating all variants at once is impractical, generate the target viewport first, then request the missing variants.
4. Use believable but clearly illustrative sample data. Do not present sample values as a recommendation or medical benchmark.
5. Include realistic states, not only an ideal full dashboard: empty, active, error, and confirmation states where the screen needs them.
6. Keep related components visually and behaviourally consistent across screens.
7. Do not invent unrelated features, extra navigation items, social features, growth charts, health scores, or medical advice that are outside the MVP.
8. Do not overdecorate. Preserve a clear hierarchy, generous whitespace, and quick access to common actions.
9. Include interaction notes for hover, focus, pressed, loading, selection, dialog opening/closing, and reduced motion where relevant. Stitch mockups can communicate intended motion; implementation should still be verified in code.
10. Iterate when a generated layout harms readability, touch usability, contrast, or content priority. The system is a starting direction and may evolve based on that review.

### Reusable instruction to prepend to every screen prompt

> Use the attached `design.md` as the shared product and design reference for TinySteps. Follow its brand personality, semantic colour tokens, typography, responsive behaviour, light/dark theme requirements, accessibility standards, and motion principles. The design system is a flexible starting point, not a rigid template: keep the product consistent while choosing the best layout for this specific screen. Create polished, implementation-aware UI with realistic sample data and complete relevant UI states. Show both light and dark themes, and include mobile and desktop layouts. Do not add features outside the TinySteps MVP or make medical claims.

---

## 8. Implementation reference

The expected frontend stack is **Nuxt, Vue 3, TypeScript, and Tailwind CSS**. Stitch is used to design and iterate on the interface; the resulting visuals should later be translated into reusable Vue components and semantic design tokens.

Suggested component areas:
- App shell: header, sidebar, bottom navigation, page container.
- Dashboard: daily summary, quick-log actions, active session, timeline.
- Routines: shared log dialog, feeding form, sleep form, diaper form, event row, event menu.
- Shared UI: buttons, inputs, selects, cards, dialogs, toast, skeleton, empty state, confirm dialog, theme switcher.
- Pages: dashboard, history, baby profile, settings, first-run onboarding.

Keep routine records and UI states typed and consistent. Do not couple the visual design to a specific backend. The first visual prototype may use sample data; persistence, accounts, and secure data access should be designed as separate implementation decisions.

---

## 9. Reference links

- Google Labs — Stitch updates and workflow: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/
- Google Stitch: https://stitch.withgoogle.com/
- Tailwind CSS — Dark mode: https://tailwindcss.com/docs/dark-mode
- Nuxt documentation: https://nuxt.com/docs
- W3C WAI — Respecting reduced-motion preferences: https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html
