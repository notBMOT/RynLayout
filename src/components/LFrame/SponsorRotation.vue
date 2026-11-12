<template>
  <div class="ryn-footer">
    <span class="footer-rule"></span>
    <span class="footer-name">RYN <b>ESPORTS</b></span>
    <span class="footer-live"><i></i> PLAYER SPOTLIGHT</span>
  </div>
</template>

<style lang="css" scoped>
.ryn-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  color: #dce8f7;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.12em;
  font-size: 13px;
}
.footer-rule { width: 18px; height: 2px; background: #258dff; }
.footer-name { color: #fff; font-weight: 700; }
.footer-name b { color: #258dff; font-weight: 400; }
.footer-live { margin-left: auto; display: flex; align-items: center; gap: 5px; color: #8fa4bd; font-size: 10px; letter-spacing: 0.14em; }
.footer-live i { width: 5px; height: 5px; border-radius: 50%; background: #258dff; box-shadow: 0 0 7px #258dff; }
</style>
