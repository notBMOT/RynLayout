# Ryn eSports — broadcast identity

## Core look

A premium, dark esports package built for a transparent 1920×1080 OBS browser source.

- **Primary background:** near-black `#070A10`
- **Primary accent:** electric blue `#087BFF`
- **Secondary accent:** ice cyan `#00C8FF`
- **Deep blue:** `#123B70`
- **Panel surfaces:** near-black at 88% (primary) and 68% (secondary)
- **Corners:** restrained 2–8px broadcast geometry; screen-edge elements stay square

## Brand rules

- The wordmark is always written **Ryn eSports** in plain text; the scoreboard lockup uses `RYN` over `ESPORTS`.
- Electric blue is the broadcast identity. Blue-side and red-side colors remain reserved for team identity and game state.
- Prefer black glass panels, precise blue keylines, small cyan highlights and subtle glow over large neon fills.
- Keep text uppercase and compact, with tabular numerals for game statistics.
- Motion should be quick and restrained; honor reduced-motion preferences.

## Overlay architecture

The design skins the existing BlueBottle League Broadcast client; it does not replace its live data connection or phase routing. Keep the current 1920×1080 transparent canvas and component registry intact.

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
- Preserve BlueBottle's game-state data selectors, transitions and feature/tier gating when changing visuals.
