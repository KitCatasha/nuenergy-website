<script setup>
// import logoWhite from '../../images/nuenergy-logo-horizontal-white.webp';
import logoWhite from '../../images/Primary Logo_Transparent White.png';

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer bg-[oklch(57.44%_0.0355_111.38)] px-5 py-5 md:px-24 md:py-10">
        <aside class="gap-6">
            <div class="flex items-center gap-2 text-xl font-bold">
                <img :src="logoWhite" alt="NU Energy Logo" class="w-48" />
            </div>
            <p class="font-sans text-white">
                © {{ currentYear }} NÜenergy Sports Nutrition, LLC<br />All
                rights reserved
            </p>
        </aside>
        <nav class="menu-footer text-base-content">
            <h6 class="footer-title">Connect</h6>
            <a href="/contact/" class="link link-hover">contact us</a>
        </nav>
        <nav class="menu-footer text-base-content">
            <h6 class="footer-title">About</h6>
            <a href="/#about" class="link link-hover">who we are</a>
            <a href="/#inovative-design" class="link link-hover">our pouch</a>
            <a href="/#benefits" class="link link-hover">benefits</a>
            <a href="/#nutrition-facts" class="link link-hover">our ingredients</a>
        </nav>
    </footer>
</template>
