<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import AOS from 'aos';
import Navbar from '@/Components/Navbar.vue';
import Footer from '@/Components/Footer.vue';
import Hero from '@/Components/Hero.vue';
import About from '@/Components/About.vue';
import Inovative from '@/Components/Inovative.vue';
import Info from '@/Components/Info.vue';
import FlavorSection from '@/Components/FlavorSection.vue';
import Benefits from '@/Components/Benefits.vue';
import NutritionFact from '@/Components/NutritionFact.vue';
import flavours from './content/flavours.json';
import Contact from '@/Components/Contact.vue';
const props = defineProps({ path: { type: String, default: '/' } });
const isContact = props.path.replace(/\/$/, '') === '/contact';
const menuOpen = ref(false);
const closeMenu = () => { menuOpen.value = false; };
const onKey = event => { if (event.key === 'Escape') closeMenu(); };
onMounted(async () => {
  await nextTick();
  AOS.init({ once: true, disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
  requestAnimationFrame(() => AOS.refreshHard());
  document.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => { document.removeEventListener('keydown', onKey); });
</script>
<template>
  <Navbar :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />
  <template v-if="menuOpen">
    <button class="fixed inset-0 z-40 bg-black/40" aria-label="Close menu" @click="closeMenu"></button>
    <aside id="site-menu" class="fixed right-0 top-0 z-50 h-dvh w-80 max-w-[90vw] bg-[#e8eadb] p-6 text-[#424b35]" aria-label="Main navigation">
      <div class="mb-8 flex items-center justify-between"><h2 class="text-xl font-bold">Menu</h2><button type="button" aria-label="Close menu" class="p-3 text-2xl" @click="closeMenu">×</button></div>
      <nav class="flex flex-col gap-6" @click="closeMenu">
        <a href="/#hero">home</a><a href="/#about">who we are</a><a href="/#inovative-design">our pouch</a><a href="/#benefits">benefits</a><a href="/#nutrition-facts">nutritional properties</a><a href="/contact/">contact us</a>
      </nav>
    </aside>
  </template>
  <main v-if="isContact"><Contact /></main>
  <main v-else><Hero /><About /><Inovative /><Info /><FlavorSection :flavours="flavours" /><Benefits /><NutritionFact /></main>
  <Footer />
</template>
