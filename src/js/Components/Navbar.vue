<script setup>
import ApplicationLogo from './ApplicationLogo.vue';
defineProps({ menuOpen: Boolean });
defineEmits(['toggle-menu']);
</script>
<template>
  <nav class="navbar-sticky navbar z-10 justify-between bg-transparent !p-0" aria-label="Header">
    <div class="navbar-start"></div>
    <div class="navbar-center flex items-center"><a href="/#hero" aria-label="NÜenergy home"><ApplicationLogo class="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" /></a></div>
    <div class="navbar-end items-center gap-4">
      <button type="button" class="menu-toggle" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" aria-controls="site-menu" :aria-expanded="menuOpen" @click="$emit('toggle-menu')">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
          <path v-if="menuOpen" d="M6 6l12 12M6 18 18 6" />
          <path v-else d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </nav>
</template>
<style scoped>
.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  margin-right: 16px;
  padding: 0;
  border: 1px solid rgb(103 112 33 / 20%);
  border-radius: 18px;
  background: #fff9e9;
  color: #4f5718;
  box-shadow: 0 5px 16px rgb(17 21 11 / 12%);
  cursor: pointer;
  transition: background-color .2s, box-shadow .2s;
}
.menu-toggle:hover {
  background: #f2edce;
  box-shadow: 0 7px 20px rgb(17 21 11 / 18%);
}
.menu-toggle:focus-visible {
  outline: 3px solid #677021;
  outline-offset: 4px;
}
@media (max-width: 640px) {
  .menu-toggle {
    width: 52px;
    height: 52px;
    margin-right: 12px;
    border-radius: 15px;
  }
  .menu-toggle svg { width: 28px; height: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .menu-toggle { transition: none; }
}
</style>
