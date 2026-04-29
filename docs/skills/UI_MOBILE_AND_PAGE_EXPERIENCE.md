# UI, Mobile and Page Experience Skill

This skill defines the design, mobile responsiveness, navigation, layout, and page experience rules for DeepMindResources.

DeepMindResources should feel clean, technical, trustworthy, modern, educational, and business-ready across desktop, tablet, and mobile.

---

## Core Purpose

The UI should help users understand and use the platform without friction.

The interface should support:

- Learning
- Tool intelligence
- Live AI updates
- Master Brain workflows
- Agentic Sandbox practice
- Business AI training
- Team progress and future dashboards

The UI should not feel like a generic app template or a black/green hacker dashboard.

---

## Core Rule

Every public page and app page must work properly on mobile, tablet, and desktop.

Do not build desktop-only pages.

Do not let sidebars, fixed widths, grids, code panels, cards, headings, or badges squeeze mobile layouts.

Mobile quality is part of the definition of done.

---

## Brand Direction

Use the DeepMindResources blue/white brand direction.

Preferred feel:

- Clean
- Technical
- Trustworthy
- Educational
- Intelligent
- Modern
- Business-ready
- Less dark hacker dashboard
- More high-trust AI training platform

Suggested palette:

- Deep Navy: #061B5B
- Royal Blue: #123BFF
- Electric Blue: #0A63FF
- Cyan Blue: #45C9FF
- Soft Sky: #EAF7FF
- White: #FFFFFF
- Dark Text: #07152F
- Muted Text: #40516F

---

## Layout Rules

Pages should:

- Use responsive containers
- Avoid fixed desktop padding on mobile
- Stack sections naturally on small screens
- Avoid horizontal overflow
- Keep headings readable
- Keep buttons tappable
- Keep cards legible
- Use enough spacing without wasting screen height

Desktop sidebars must not force mobile content into a narrow strip.

Recommended principle:

- Mobile: full-width content with top navigation or drawer
- Desktop: sidebar or wide dashboard layout where appropriate

---

## Mobile Navigation Rules

On mobile, navigation should usually use:

- Top bar
- Menu button
- Drawer navigation
- Clear close button
- Backdrop overlay
- Full-width main content area

Desktop sidebars should not remain permanently visible on mobile.

Mobile navigation should not crush the page content.

---

## Hero Section Rules

Hero sections must be responsive.

Mobile hero sections should have:

- Smaller headline sizes
- Comfortable line breaks
- Shorter vertical padding
- Status pills that do not overflow
- Buttons stacked or wrapped cleanly
- Summary text that remains readable

Desktop hero sections can be larger and more spacious.

---

## Dashboard Grid Rules

Dashboard grids should collapse on smaller screens.

Recommended behaviour:

- Mobile: one column
- Tablet: one or two columns depending on content
- Desktop: full dashboard grid

Cards should never be squeezed into unreadable widths.

---

## Code and Sandbox UI Rules

Code and sandbox areas need special mobile handling.

They should:

- Avoid horizontal page overflow
- Use scrollable code regions where needed
- Preserve readable font size
- Collapse panels or use tabs on mobile
- Keep action buttons accessible
- Avoid tiny controls

If a sandbox feature only works well on desktop, label or redesign it before public release.

---

## Text and Readability Rules

Text should be readable on all screen sizes.

Use:

- Clear line height
- Sensible max widths
- Short paragraphs
- Helpful headings
- Strong contrast
- Responsive font sizes

Avoid:

- Huge desktop headings on mobile
- Long paragraphs in narrow columns
- Low contrast text
- Overlapping badges or pills
- Tiny labels that carry important meaning

---

## Button and CTA Rules

Buttons should be clear and tappable.

Mobile buttons should:

- Have enough height
- Stack when needed
- Avoid overflowing text
- Have clear labels
- Use consistent visual hierarchy

Avoid placing too many CTAs in one cramped mobile row.

---

## Public Page Rules

Public pages should feel like finished customer-facing pages.

They should include:

- Proper page title and metadata
- Clear H1
- Strong intro copy
- Useful content sections
- Clean CTA
- Good mobile layout
- No internal/admin copy
- No v0 placeholder metadata
- No generic placeholder content

---

## App and Dashboard Page Rules

Dashboard pages should prioritise usability.

They should:

- Make status obvious
- Use clear labels
- Avoid clutter
- Separate primary and secondary actions
- Show empty states clearly
- Handle mobile views gracefully

If a dashboard section is not live yet, label it honestly without pretending fake activity is real.

---

## Accessibility Rules

UI should follow basic accessibility expectations.

Use:

- Semantic headings
- Buttons for actions
- Links for navigation
- Meaningful labels
- Keyboard-friendly controls
- Sufficient contrast
- Visible focus states
- Alt text for meaningful images

Do not rely on colour alone for important status.

---

## Empty State Rules

Empty states should be useful.

They should explain:

- What will appear here
- Why it matters
- What the user can do next

Avoid blank panels or fake random data where real data is not available.

Demo data may be used during early build, but it should be realistic and clearly aligned with product direction.

---

## Status and Queue UI Rules

For Live AI Intelligence, Master Brain, lessons, and sandbox queues, status labels should be clear.

Useful statuses include:

- Signal detected
- Needs validation
- Verified
- Lesson update pending
- Sandbox task pending
- Published
- Rejected as noise

Status UI should help the user understand the intelligence pipeline.

---

## Performance Experience Rules

Pages should feel responsive.

Avoid:

- Excessive client-side animations
- Heavy unnecessary scripts
- Layout shifts
- Huge unoptimised images
- Rendering large unused sections on mobile

Interactive effects should support meaning, not distract.

---

## Definition of Done

A page or component is UI-ready when it has:

- Responsive mobile layout
- Good desktop layout
- No horizontal overflow
- Clear heading hierarchy
- Readable text
- Tappable controls
- Accessible navigation
- Clean brand styling
- Useful empty states
- No placeholder/template leftovers

---

## Locked Rule

Every DeepMindResources page should feel intentional, responsive, and trustworthy.

If it looks crushed, unfinished, generic, or confusing on mobile, it is not done.
