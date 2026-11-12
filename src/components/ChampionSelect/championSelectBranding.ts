import leagueBroadcastLogo from '@/assets/leaguebroadcast-logo_text-color-bright_outline.png'

export interface ChampionSelectPartnerLogo {
  alt: string
  source: string
}

/**
 * External broadcast partner marks only. Ryn eSports is the layout identity;
 * BlueBottle's product mark is intentionally not displayed in the draft scene.
 */
export const CHAMPION_SELECT_PARTNER_LOGOS: readonly ChampionSelectPartnerLogo[] = [
  { alt: 'League Broadcast', source: leagueBroadcastLogo },
]
