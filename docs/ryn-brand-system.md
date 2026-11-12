# Ryn eSports — broadcast identity

## Core look

A minimal, premium esports package built for a transparent 1920×1080 OBS browser source.

- **Primary background:** near-black `#070A10`
- **Primary accent:** electric blue `#087BFF`
- **Secondary accent:** ice cyan `#00C8FF`
- **Deep blue:** `#123B70`
- **Panel surfaces:** near-black at 92% (primary) and 78% (secondary)
- **Corners:** restrained 2–6px broadcast geometry; screen-edge elements stay square
- **Effects:** subtle shadows only; no oversized neon fills, gradients or decorative glow

## Brand rules

- The wordmark is plain text: **Ryn eSports**. The scoreboard lockup uses `RYN` over `ESPORTS`.
- Do not display the BlueBottle logo or icon in the Ryn broadcast identity or app favicon. BlueBottle remains the underlying integration only.
- Electric blue is the broadcast identity. Blue-side and red-side colors remain reserved for team identity and game state.
- Prefer near-black panels, precise blue keylines, small cyan highlights and generous negative space.
- Keep text uppercase and compact, with tabular numerals for game statistics.
- Motion should be quick and restrained; honor reduced-motion preferences.

## Overlay architecture

The design skins the existing League Broadcast client; it does not replace its live data connection or phase routing. Keep the current 1920×1080 transparent canvas and component registry intact.

Primary entry points:
- `/` — complete broadcast source (champion select, in-game, post-game)
- `/ingame` — in-game graphics
- `/pregame` — champion select
- `/postgame` — post-game
- `/ingame/elements` — individual OBS elements and preview index

## Implementation notes

- Global brand and surface tokens live in `src/style.css`.
- The scoreboard wordmark and match identity live in `src/components/Scoreboard/Scoreboard.vue`.
- Shared element placement lives in `src/views/overlay-layout.css`.
- The custom Ryn favicon is `public/favicon.svg`.
- Preserve the existing LeagueBroadcast game-state selectors, transitions and feature/tier gating when changing visuals.
