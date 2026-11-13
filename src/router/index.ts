import { createRouter, createWebHistory } from 'vue-router'
import CombinedView from '@/views/CombinedView.vue'
import OverlayView from '@/views/OverlayView.vue'
import ElementView from '@/views/ElementView.vue'
import ElementIndexView from '@/views/ElementIndexView.vue'
import { migrateLegacyHashRoute, resolveRouterBase } from './routerBase'

const routerBase = resolveRouterBase(window.location.pathname, import.meta.env.BASE_URL)
migrateLegacyHashRoute(routerBase)

const router = createRouter({
  history: createWebHistory(routerBase),
  routes: [
    // Full broadcast: scenes switch automatically with live game phase.
    { path: '/', name: 'combined', alias: '/combined', component: CombinedView },

    // Explicit production sources. /draft and /game are short, memorable
    // aliases; legacy /pregame and /ingame URLs remain fully supported.
    { path: '/game', name: 'game', alias: '/ingame', component: OverlayView },
    {
      path: '/draft',
      name: 'draft',
      alias: '/pregame',
      component: () => import('@/views/PregameView.vue'),
    },
    {
      path: '/pregame-3d',
      name: 'pregame-3d',
      component: () => import('@/views/PregameView.vue'),
      props: { enable3d: true },
    },
    {
      path: '/pregame-hybrid',
      name: 'pregame-hybrid',
      component: () => import('@/views/PregameView.vue'),
      props: { variant: 'hybrid' },
    },
    { path: '/postgame', name: 'postgame', component: () => import('@/views/PostgameView.vue') },

    // Standalone Ryn studio scenes for OBS / vMix browser sources.
    {
      path: '/broadcast/:scene(pre-stream|casters|interview|post-game)',
      name: 'ryn-studio',
      component: () => import('@/views/RynStudioView.vue'),
    },
    { path: '/ingame/elements', name: 'elements', component: ElementIndexView },
    { path: '/ingame/element/:slug', name: 'element', component: ElementView },
  ],
})

export default router
