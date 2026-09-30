<script setup>
import ApplicationLogo from './ApplicationLogo.vue';
defineProps({ menuOpen: Boolean });
defineEmits(['toggle-menu']);
</script>
<template>
  <nav class="navbar-sticky navbar z-10 justify-between bg-transparent !p-0" aria-label="Header">
    <div class="navbar-start"></div>
    <div class="navbar-center flex items-center"><a href="/#hero" aria-label="NÜenergy home"><ApplicationLogo class="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" /></a></div>
    <div class="navbar-end items-center gap-4"><button type="button" class="btn btn-circle btn-text mr-2 text-black" aria-label="Open menu" aria-controls="site-menu" :aria-expanded="menuOpen" @click="$emit('toggle-menu')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button></div>
  </nav>
</template>
