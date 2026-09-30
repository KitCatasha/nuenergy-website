<script>
import bgHero from '../../images/coastal-runner.png';

export default {
	data() {
		return {
			bgHero,
			messages: [
				'100% natural, vegan, halal, gluten-free, and yummy',
				'packed with a powerhouse of carbs, vitamins, minerals and amino acids',
				'loaded with niacin for supporting carb-to-energy conversion and muscle recovery',
			],
			messageIndex: 0,
			messageKey: 0, // Unique key for each message
			message: '100% natural, vegan, halal, gluten-free, and yummy', // Initial message
		};
	},
	mounted() {
		// Change the message every second
		this.interval = setInterval(() => {
			this.messageIndex = (this.messageIndex + 1) % this.messages.length;
			this.message = this.messages[this.messageIndex];
			this.messageKey++; // Increment key to trigger transition
		}, 6000);
	},
	beforeUnmount() {
		// Clear the interval when the component is destroyed
		clearInterval(this.interval);
	},
};
</script>

<style>
/* Add fade transition styles */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>

<template>
  <section id="hero" class="hero-runner" :style="{ backgroundImage: `url(${bgHero})` }">
    <div class="hero-copy">
      <div class="hero-heading-space">
        <transition appear name="fade" mode="out-in">
          <h1 :key="messageKey" class="hero-heading">
            {{ message }}
          </h1>
        </transition>
      </div>
      <p class="hero-description">Natural carbohydrates, electrolytes,<br class="hero-desktop-break" /> vitamins, minerals and amino acids.</p>
      <ul class="hero-badges" aria-label="Energy gel highlights">
        <li>
          <span class="hero-badge-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25 7C13 5 5 11 8 20c3 8 14 6 17-13Z" fill="currentColor"/><path d="m5 27 17-16" fill="none" stroke="currentColor" stroke-width="2"/><path d="m9 23 13-12" fill="none" stroke="#fff9e9" stroke-width="1.3"/></svg></span>
          <span>Natural<br />ingredients</span>
        </li>
        <li>
          <span class="hero-badge-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m19 3-12 16h8l-2 10 13-17h-9Z" fill="currentColor"/></svg></span>
          <span>29 <span style="text-transform: none;">g</span><br />carbohydrates</span>
        </li>
        <li>
          <span class="hero-badge-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3S6 16 6 21a10 10 0 0 0 20 0C26 16 16 3 16 3Z" fill="currentColor"/></svg></span>
          <span>Natural<br />electrolytes</span>
        </li>
        <li>
          <span class="hero-badge-icon"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="21" cy="6" r="2.5" fill="currentColor" stroke="none"/><path d="m10 12 6-3 5 7 6-2M16 9l-4 10 7 3-2 7M12 19l-7 9"/></svg></span>
          <span>120<br />calories</span>
        </li>
      </ul>
      <a href="#about" class="hero-discover">Discover NÜenergy <span aria-hidden="true">→</span></a>
    </div>
  </section>
</template>

<style scoped>
.hero-runner {
  min-height: 100svh;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  padding: 150px 5% 70px;
  color: #11150b;
}
.hero-copy { width: 49%; max-width: 740px; }
.hero-heading-space { min-height: 3.5em; font-size: clamp(2.1rem, 3.6vw, 4rem); display: flex; align-items: center; }
.hero-heading { margin: 0; font-family: 'Quicksand-900', 'Quicksand', sans-serif; font-weight: 900; font-size: inherit; line-height: 1.08; letter-spacing: -0.035em; text-wrap: balance; }
.hero-heading-line { display: block; }
.hero-description { margin-top: 18px; font-size: clamp(1.05rem, 1.75vw, 1.8rem); line-height: 1.3; font-weight: 500; }
.hero-badges { display: grid; grid-template-columns: repeat(4, 1fr); list-style: none; padding: 0; margin: 32px 0; max-width: 580px; }
.hero-badges li { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding: 0 8px; font-weight: 800; font-size: clamp(.65rem, .82vw, .85rem); line-height: 1.25; text-transform: uppercase; }
.hero-badges li + li { border-left: 1px solid rgb(17 21 11 / 15%); }
.hero-badge-icon { width: 54px; height: 54px; border: 2px solid currentColor; border-radius: 50%; display: grid; place-items: center; }
.hero-badge-icon svg { width: 34px; height: 34px; }
.hero-discover { display: inline-flex; align-items: center; justify-content: center; gap: 25px; border-radius: 999px; background: #677021; color: #fff9e9; padding: 16px 30px; font-size: 1.15rem; font-weight: 600; transition: background .2s; }
.hero-discover:hover { background: #4f5718; }
.hero-discover:focus-visible { outline: 3px solid #11150b; outline-offset: 4px; }
.hero-discover span { font-size: 1.6rem; line-height: 1; }
@media (max-width: 767px) {
  .hero-runner { min-height: 100svh; align-items: flex-end; padding: 340px 22px 40px; background-position: 63% top; }
  .hero-copy { width: 100%; max-width: 600px; background: rgb(255 249 233 / 90%); border-radius: 22px; padding: 22px 18px; }
  .hero-heading-space { font-size: clamp(1.8rem, 6.8vw, 2.6rem); min-height: 4.4em; }
  .hero-description { font-size: 1rem; }
  .hero-desktop-break { display: none; }
  .hero-badges { margin: 25px 0; }
  .hero-badges li { padding: 0 3px; font-size: .58rem; }
  .hero-badge-icon { width: 42px; height: 42px; }
  .hero-badge-icon svg { width: 27px; height: 27px; }
  .hero-discover { width: 100%; font-size: 1rem; padding: 13px 18px; }
}
</style>
