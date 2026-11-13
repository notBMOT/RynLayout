# Ryn eSports scene guide

Use separate OBS browser sources when you want direct control over each phase:

| Scene | URL | Use |
|---|---|---|
| Full broadcast | `/` | Automatically layers draft, live game and post-game according to the connected broadcast state |
| Draft / champion select | `/draft` | Champion picks, bans, phase timer and draft presentation only |
| In-game | `/game` | Scoreboard, player panels, objective timers, minimap frame, kill feed and live match graphics only |
| Post-game data recap | `/postgame` | Match result and recap graphics driven by LeagueBroadcast |
| Pre-stream | `/broadcast/pre-stream` | Branded countdown, matchup card and upcoming match slate |
| Caster desk | `/broadcast/casters` | Two caster camera frames with role lower-thirds |
| Player interview | `/broadcast/interview` | Interview camera frame, player identity and winning team |
| Post-game result | `/broadcast/post-game` | Standalone series winner and final score card |

The older `/pregame` and `/ingame` URLs remain valid aliases for compatibility. The optional `/pregame-3d` and `/pregame-hybrid` draft variants remain available.

## Standalone studio scene fields

The four `/broadcast/:scene` routes are self-contained 1920×1080 scenes and do not require a live LeagueBroadcast session. Use query parameters to replace the sample text:

- `event` — event or league name
- `match` — matchup label
- `left` / `right` — team names
- `countdown` — pre-stream countdown display
- `caster1` / `caster2` — caster names
- `guest` — interview player name
- `winner` — winning team
- `leftScore` / `rightScore` — final series score

Example: `http://localhost:5173/broadcast/pre-stream?event=RYN%20CUP&match=ALPHA%20VS%20OMEGA&countdown=00:02:00`

These are designed as static broadcast graphics with editable URL text, not a replacement for the live game-state-driven post-game data recap at `/postgame`.

## Visual separation

- **Draft:** treat champion select as its own full-canvas scene. Keep the pick/ban information, team identity and phase timer as the focus; do not show in-game HUD elements.
- **In-game:** use a compact top scoreboard and restrained translucent panels. The Ryn blue accent is for the broadcast frame; blue-side and red-side colors continue to identify the two teams.
- **Studio scenes:** use an opaque near-black/navy stage, electric-blue keylines, restrained cyan highlights, and consistent text hierarchy. Keep camera placeholders framed so OBS camera sources can be layered behind or substituted during production.
- **Shared brand:** near-black surfaces, electric-blue keylines, cyan used sparingly, consistent spacing and minimal glow.
- **OBS:** all sources use the existing 1920×1080 canvas. Draft and in-game remain transparent overlays; the studio scenes intentionally use their own opaque backgrounds.

## OBS setup

For separate production control, add browser sources at 1920×1080. Example local URLs:

1. Draft: `http://localhost:5173/draft`
2. In-game: `http://localhost:5173/game`
3. Pre-stream: `http://localhost:5173/broadcast/pre-stream`
4. Caster desk: `http://localhost:5173/broadcast/casters`
5. Interview: `http://localhost:5173/broadcast/interview`
6. Standalone result: `http://localhost:5173/broadcast/post-game`

Use the root URL instead if you prefer a single source that changes with the match phase. Connect the app to the running LeagueBroadcast server as usual for the live draft, in-game and data-driven post-game scenes.
