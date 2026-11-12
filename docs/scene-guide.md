# Ryn eSports scene guide

Use separate OBS browser sources when you want direct control over each phase:

| Scene | URL | Use |
|---|---|---|
| Full broadcast | `/` | Automatically layers draft, live game and post-game according to the connected broadcast state |
| Draft / champion select | `/draft` | Champion picks, bans, phase timer and draft presentation only |
| In-game | `/game` | Scoreboard, player panels, objective timers, minimap frame, kill feed and live match graphics only |
| Post-game | `/postgame` | Match result and recap graphics |

The older `/pregame` and `/ingame` URLs remain valid aliases for compatibility. The optional `/pregame-3d` and `/pregame-hybrid` draft variants remain available.

## Visual separation

- **Draft:** treat champion select as its own full-canvas scene. Keep the pick/ban information, team identity and phase timer as the focus; do not show in-game HUD elements.
- **In-game:** use a compact top scoreboard and restrained translucent panels. The Ryn blue accent is for the broadcast frame; blue-side and red-side colors continue to identify the two teams.
- **Shared brand:** near-black surfaces, electric-blue keylines, cyan used sparingly, consistent spacing and minimal glow.
- **OBS:** all sources use the existing transparent 1920×1080 canvas. Do not add a solid page background to draft or in-game overlays.

## OBS setup

For separate scene control, add two Browser sources at 1920×1080:
1. Draft source URL: `http://localhost:5173/draft`
2. In-game source URL: `http://localhost:5173/game`

Use the root URL instead if you prefer a single source that changes with the match phase. Connect the app to the running LeagueBroadcast server as usual.
