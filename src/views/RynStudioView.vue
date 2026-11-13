<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scene = computed(() => String(route.params.scene ?? 'pre-stream'))
const query = computed(() => route.query)
const isPre = computed(() => scene.value === 'pre-stream')
const isCaster = computed(() => scene.value === 'casters')
const isInterview = computed(() => scene.value === 'interview')
const isPost = computed(() => scene.value === 'post-game')
const heading = computed(() => ({
  'pre-stream': 'BROADCAST STARTING SOON',
  casters: 'ON THE DESK',
  interview: 'POST-MATCH INTERVIEW',
  'post-game': 'MATCH COMPLETE',
}[scene.value] ?? 'RYN ESPORTS'))
const event = computed(() => String(query.value.event ?? 'RYN CHAMPIONSHIP'))
const matchup = computed(() => String(query.value.match ?? 'NORTHWIND  VS  NIGHTFALL'))
const leftTeam = computed(() => String(query.value.left ?? 'NORTHWIND'))
const rightTeam = computed(() => String(query.value.right ?? 'NIGHTFALL'))
const winner = computed(() => String(query.value.winner ?? leftTeam.value))
const leftScore = computed(() => String(query.value.leftScore ?? '2'))
const rightScore = computed(() => String(query.value.rightScore ?? '1'))
const guest = computed(() => String(query.value.guest ?? 'PLAYER NAME'))
const casterOne = computed(() => String(query.value.caster1 ?? 'CASTER ONE'))
const casterTwo = computed(() => String(query.value.caster2 ?? 'CASTER TWO'))
const countdown = computed(() => String(query.value.countdown ?? '00:05:00'))
</script>

<template>
  <main class="ryn-studio" :class="'scene-' + scene">
    <div class="ambient-grid" />
    <div class="edge edge-top" />
    <header class="topline">
      <div class="wordmark">Ryn <span>eSports</span></div>
      <div class="event-name">{{ event }}</div>
      <div class="live-mark"><i /> LIVE BROADCAST</div>
    </header>

    <template v-if="isPre">
      <section class="pre-content">
        <div class="eyebrow"><span /> THE ARENA IS ALMOST READY</div>
        <h1>THE NEXT<br /><em>CHAPTER</em><br />STARTS HERE.</h1>
        <p class="subline">{{ matchup }} <b>·</b> {{ event }}</p>
        <div class="countdown">
          <span class="count-label">BROADCAST BEGINS IN</span>
          <strong>{{ countdown }}</strong>
        </div>
      </section>
      <aside class="schedule">
        <span class="section-kicker">TODAY'S MATCH</span>
        <div class="team-line"><b class="team-mark">N</b><strong>{{ leftTeam }}</strong><small>BLUE SIDE</small></div>
        <div class="versus">VS</div>
        <div class="team-line"><b class="team-mark alt">N</b><strong>{{ rightTeam }}</strong><small>RED SIDE</small></div>
        <div class="schedule-rule" />
        <span class="section-kicker">COMING UP</span>
        <strong class="next-match">MATCH 02 · SEMI-FINAL</strong>
        <span class="muted">Stay tuned for the opening draft</span>
      </aside>
      <footer class="bottomline"><span>PREPARE FOR COMPETITION</span><span>RYN ESPORTS <b>—</b> OFFICIAL BROADCAST</span></footer>
    </template>

    <template v-else-if="isCaster">
      <section class="caster-title">
        <div class="eyebrow"><span /> THE CAST DESK</div>
        <h1>THE VOICES<br /><em>OF THE GAME.</em></h1>
        <p>{{ matchup }}</p>
      </section>
      <section class="caster-stage">
        <div class="caster-frame">
          <div class="camera-placeholder"><span>CAM 01</span><b>CASTER CAMERA</b></div>
          <div class="nameplate"><strong>{{ casterOne }}</strong><small>PLAY-BY-PLAY</small></div>
        </div>
        <div class="caster-divider"><span>RYN</span><i /></div>
        <div class="caster-frame">
          <div class="camera-placeholder second"><span>CAM 02</span><b>CASTER CAMERA</b></div>
          <div class="nameplate"><strong>{{ casterTwo }}</strong><small>COLOUR COMMENTARY</small></div>
        </div>
      </section>
      <footer class="bottomline"><span>{{ event }}</span><span>ANALYSIS · INSIGHT · COMPETITION</span></footer>
    </template>

    <template v-else-if="isInterview">
      <section class="interview-heading">
        <div class="eyebrow"><span /> INSIDE THE ARENA</div>
        <h1>THE WINNING<br /><em>MOMENT.</em></h1>
        <p>EXCLUSIVE POST-MATCH INTERVIEW</p>
      </section>
      <section class="interview-stage">
        <div class="interview-camera"><div class="camera-tag">PLAYER CAM · 01</div><div class="camera-crosshair">+</div></div>
        <div class="interview-info">
          <span class="section-kicker">PLAYER OF THE MATCH</span>
          <h2>{{ guest }}</h2>
          <div class="team-chip">{{ winner }}</div>
          <div class="info-rule" />
          <span class="muted">{{ event }}</span>
          <strong class="interview-match">{{ matchup }}</strong>
        </div>
      </section>
      <footer class="bottomline"><span>RYN ESPORTS INTERVIEW DESK</span><span>THE STORY BEHIND THE WIN</span></footer>
    </template>

    <template v-else-if="isPost">
      <section class="post-heading">
        <div class="eyebrow"><span /> FINAL RESULT</div>
        <h1>VICTORY<br /><em>CLAIMED.</em></h1>
        <p>{{ event }} <b>·</b> {{ matchup }}</p>
      </section>
      <section class="result-card">
        <span class="section-kicker">SERIES WINNER</span>
        <div class="winner-name">{{ winner }}</div>
        <div class="score-row">
          <div><small>{{ leftTeam }}</small><strong>{{ leftScore }}</strong></div>
          <span>—</span>
          <div><small>{{ rightTeam }}</small><strong>{{ rightScore }}</strong></div>
        </div>
        <div class="result-foot"><span>FINAL SERIES SCORE</span><span>BEST OF 3</span></div>
      </section>
      <footer class="bottomline"><span>THANK YOU FOR WATCHING</span><span>RYN ESPORTS <b>—</b> END OF BROADCAST</span></footer>
    </template>

    <template v-else>
      <section class="pre-content"><div class="eyebrow"><span /> RYN ESPORTS</div><h1>SCENE NOT<br /><em>FOUND.</em></h1><p>Use /broadcast/pre-stream, /broadcast/casters, /broadcast/interview or /broadcast/post-game.</p></section>
    </template>
    <div class="corner corner-left" /><div class="corner corner-right" />
  </main>
</template>

<style scoped>
.ryn-studio{position:relative;width:1920px;height:1080px;overflow:hidden;background:radial-gradient(ellipse at 75% 48%,#0b1b31 0%,#080e18 34%,#05080e 76%);color:#edf6ff;font-family:inherit}
.ambient-grid{position:absolute;inset:0;opacity:.14;background-image:linear-gradient(rgb(8 123 255 / .18) 1px,transparent 1px),linear-gradient(90deg,rgb(8 123 255 / .18) 1px,transparent 1px);background-size:80px 80px;mask-image:linear-gradient(90deg,transparent,#000 30%,#000 80%,transparent)}
.edge{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#087bff 20%,#00c8ff 50%,#087bff 80%,transparent);opacity:.8}.edge-top{top:0}
.topline{position:absolute;top:48px;left:84px;right:84px;display:flex;align-items:center;justify-content:space-between;z-index:2}
.wordmark{font-size:29px;font-weight:900;letter-spacing:-1.5px}.wordmark span{font-weight:400;color:#a9c4e4}
.event-name,.live-mark,.eyebrow,.section-kicker,.count-label,.bottomline,.nameplate small,.camera-placeholder span,.camera-tag,.result-foot{font-size:15px;font-weight:700;letter-spacing:3px}
.event-name{color:#9db4ce}.live-mark{display:flex;align-items:center;gap:12px;color:#b8cce2}.live-mark i,.eyebrow span{display:inline-block;width:8px;height:8px;border-radius:50%;background:#00c8ff;box-shadow:0 0 14px #00c8ff}
.pre-content{position:absolute;left:150px;top:235px;width:1050px}.eyebrow{display:flex;align-items:center;gap:14px;color:#9cb8d8}.pre-content h1,.caster-title h1,.interview-heading h1,.post-heading h1{font-size:116px;line-height:.88;letter-spacing:-3px;font-weight:900;margin:38px 0 28px}.pre-content h1 em,.caster-title h1 em,.interview-heading h1 em,.post-heading h1 em{font-style:normal;color:#168cff;text-shadow:0 0 42px rgb(8 123 255 / .25)}
.subline,.post-heading p{font-size:19px;letter-spacing:2px;color:#a8bdd4}.subline b,.post-heading p b{color:#00c8ff;margin:0 10px}
.countdown{margin-top:82px;border-left:3px solid #087bff;padding:12px 0 12px 24px;display:flex;flex-direction:column;gap:10px}.count-label{color:#8ea9c8}.countdown strong{font-size:58px;letter-spacing:8px;font-variant-numeric:tabular-nums}
.schedule{position:absolute;right:145px;top:275px;width:440px;padding:38px;background:linear-gradient(145deg,rgb(13 27 46 / .96),rgb(5 10 18 / .96));border:1px solid rgb(8 123 255 / .42);box-shadow:0 28px 90px #0008}
.section-kicker{display:block;color:#6fbaff;font-size:13px;margin-bottom:26px}.team-line{display:grid;grid-template-columns:52px 1fr auto;align-items:center;gap:16px;margin:20px 0}.team-mark{display:grid;place-items:center;width:48px;height:48px;background:#087bff;color:white;font-size:25px}.team-mark.alt{background:#163451}.team-line strong{font-size:22px;letter-spacing:1px}.team-line small{font-size:10px;letter-spacing:2px;color:#7892ae}.versus{text-align:center;color:#00c8ff;font-weight:900;letter-spacing:5px;margin:16px 0}.schedule-rule,.info-rule{height:1px;background:linear-gradient(90deg,#087bff,transparent);margin:30px 0}.next-match{display:block;font-size:18px;letter-spacing:1px;margin-bottom:10px}.muted{display:block;color:#8ba2bd;font-size:15px;letter-spacing:1px}
.bottomline{position:absolute;left:84px;right:84px;bottom:48px;display:flex;justify-content:space-between;color:#7993b0;font-size:12px}.bottomline b{color:#00c8ff}
.caster-title{position:absolute;left:130px;top:215px}.caster-title h1{font-size:92px}.caster-title p{font-size:17px;letter-spacing:3px;color:#a8bdd4;margin-top:22px}
.caster-stage{position:absolute;left:720px;right:110px;top:220px;bottom:170px;display:grid;grid-template-columns:1fr 70px 1fr;align-items:center}.caster-frame{height:580px;display:flex;flex-direction:column;justify-content:flex-end;border:1px solid rgb(8 123 255 / .5);background:linear-gradient(145deg,#10243a,#060b13);padding:14px;box-shadow:0 22px 70px #0008}.camera-placeholder{height:100%;position:relative;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 40%,#18385a,#07101d 65%);border:1px solid #1b4770}.camera-placeholder:before,.interview-camera:before{content:"";position:absolute;inset:18px;border:1px solid rgb(0 200 255 / .15)}.camera-placeholder span{position:absolute;top:28px;left:28px;color:#83bce9;font-size:11px}.camera-placeholder b{font-size:17px;letter-spacing:5px;color:#5f84a9}.camera-placeholder.second{background:radial-gradient(ellipse at 50% 40%,#142f4c,#07101d 65%)}
.nameplate{height:80px;display:flex;align-items:center;justify-content:space-between;padding:0 22px}.nameplate strong{font-size:26px;letter-spacing:2px}.nameplate small{font-size:10px;color:#78baff;letter-spacing:2px}.caster-divider{display:flex;flex-direction:column;align-items:center;gap:14px;color:#00c8ff;font-weight:900;letter-spacing:4px}.caster-divider i{height:160px;width:1px;background:linear-gradient(transparent,#087bff,transparent)}
.interview-heading{position:absolute;left:130px;top:205px}.interview-heading h1{font-size:92px}.interview-heading p{font-size:14px;letter-spacing:3px;color:#8eabc9}
.interview-stage{position:absolute;left:760px;right:145px;top:220px;bottom:170px;display:grid;grid-template-columns:1.4fr .8fr;gap:22px}.interview-camera{position:relative;border:1px solid rgb(8 123 255 / .55);background:radial-gradient(ellipse at 50% 45%,#1a3c60,#07101b 70%);display:grid;place-items:center}.camera-tag{position:absolute;left:28px;top:28px;color:#85b9e9;font-size:11px}.camera-crosshair{font-size:80px;color:rgb(0 200 255 / .2)}.interview-info{align-self:center;padding:45px;background:linear-gradient(145deg,#10233a,#070c14);border-left:3px solid #087bff}.interview-info h2{font-size:46px;line-height:1.05;margin:18px 0}.team-chip{display:inline-block;padding:9px 14px;border:1px solid #087bff;color:#7fc5ff;font-size:13px;letter-spacing:2px}.interview-match{display:block;font-size:14px;letter-spacing:1px;margin-top:14px}
.post-heading{position:absolute;left:150px;top:245px}.post-heading h1{font-size:110px}.result-card{position:absolute;right:150px;top:250px;width:650px;padding:50px;background:linear-gradient(145deg,#10243b,#060b13);border:1px solid rgb(8 123 255 / .55);box-shadow:0 30px 100px #0009}.winner-name{font-size:50px;font-weight:900;letter-spacing:2px;margin:20px 0 40px;color:#fff}.score-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;text-align:center;gap:20px}.score-row div{display:flex;flex-direction:column;gap:10px}.score-row small{font-size:12px;letter-spacing:2px;color:#89a9ca}.score-row strong{font-size:90px}.score-row>span{color:#00c8ff;font-size:32px}.result-foot{display:flex;justify-content:space-between;border-top:1px solid #1a4168;margin-top:35px;padding-top:20px;color:#7798ba;font-size:11px}
.corner{position:absolute;bottom:0;width:38px;height:38px;border-bottom:2px solid #087bff;opacity:.8}.corner-left{left:0;border-right:2px solid #087bff}.corner-right{right:0;border-left:2px solid #087bff}
@media(prefers-reduced-motion:no-preference){.live-mark i{animation:pulse 1.8s ease-in-out infinite}@keyframes pulse{50%{opacity:.35;box-shadow:0 0 3px #00c8ff}}}
</style>
