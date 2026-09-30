<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import contact from '../../content/contact.json';
const name = ref(''), email = ref(''), subject = ref('Product enquiry'), message = ref(''), website = ref('');
const token = ref(''), busy = ref(false), status = ref(''), failed = ref(false);
const ready = Boolean(contact.workerUrl && contact.turnstileSiteKey);
const widget = ref(null); let widgetId; let disposed = false;
onMounted(() => {
  document.title = 'Contact Us | NÜenergy';
  if (!ready) return;
  const render = () => {
    if (disposed || !window.turnstile || widgetId !== undefined) return;
    widgetId = window.turnstile.render(widget.value, { sitekey: contact.turnstileSiteKey, action: 'contact', callback: value => { token.value = value; }, 'expired-callback': () => { token.value = ''; }, 'error-callback': () => { token.value = ''; status.value = 'Verification could not load. Please refresh or email us directly.'; failed.value = true; } });
  };
  if (window.turnstile) render();
  else {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true; script.onload = render;
    script.onerror = () => { failed.value = true; status.value = 'Verification could not load. Please refresh or email us directly.'; };
    document.head.appendChild(script);
  }
});
onBeforeUnmount(() => { disposed = true; if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId); });
async function submit() {
  if (busy.value || !ready || !token.value) return;
  busy.value = true; failed.value = false; status.value = '';
  try {
    const response = await fetch(contact.workerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.value, email: email.value, subject: subject.value, message: message.value, website: website.value, token: token.value }), signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error(result.error || 'We could not send your message. Please try again.');
    status.value = 'Thank you! Your message has been sent.';
    name.value = ''; email.value = ''; message.value = '';
  } catch (error) { failed.value = true; status.value = error.name === 'TimeoutError' ? 'The request timed out. Please email us directly if you are unsure whether it arrived.' : error.message; }
  finally { busy.value = false; token.value = ''; if (widgetId !== undefined && window.turnstile) window.turnstile.reset(widgetId); }
}
</script>
<template>
 <section class="contact-page">
  <div class="contact-intro"><p class="contact-eyebrow">LET’S CONNECT</p><h1>contact us</h1><p>Questions about our energy gels? Interested in working with NÜenergy? We’d love to hear from you.</p>
   <a v-if="contact.publicEmail" :href="`mailto:${contact.publicEmail}`" class="contact-email">{{ contact.publicEmail }}</a>
   <a href="/#inovative-design" class="contact-back">Explore our energy gels →</a>
  </div>
  <form class="contact-form" @submit.prevent="submit">
   <h2>send us a message</h2>
   <label for="contact-name">Your name</label><input id="contact-name" v-model="name" autocomplete="name" required maxlength="100" />
   <label for="contact-email">Email address</label><input id="contact-email" v-model="email" type="email" autocomplete="email" required maxlength="254" />
   <label for="contact-subject">Subject</label><select id="contact-subject" v-model="subject"><option>Product enquiry</option><option>Orders</option><option>Partnerships</option><option>Other</option></select>
   <label for="contact-message">Your message</label><textarea id="contact-message" v-model="message" rows="6" required minlength="10" maxlength="5000"></textarea>
   <div class="contact-trap" aria-hidden="true"><label for="contact-website">Website</label><input id="contact-website" v-model="website" tabindex="-1" autocomplete="off" /></div>
   <p class="contact-privacy">We’ll use your details to reply to your enquiry.</p>
   <div ref="widget"></div>
   <p v-if="!ready" class="contact-status">Our contact form will be available soon.</p>
   <button type="submit" :disabled="busy || !ready || !token">{{ busy ? 'Sending…' : 'Send message →' }}</button>
   <p v-if="status" class="contact-status" :class="{ 'contact-error': failed }" role="status" aria-live="polite">{{ status }}</p>
  </form>
 </section>
</template>
<style scoped>
.contact-page { min-height: 90svh; max-width: 1200px; margin: auto; padding: 160px 28px 80px; display: grid; grid-template-columns: 1fr; gap: 48px; color: #424b35; }
.contact-intro { padding-top: 20px; }.contact-eyebrow { color: #ab6c0e; font-size: .8rem; font-weight: 800; letter-spacing: .16em; }
h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 900; color: #ab6c0e; margin: 14px 0 24px; }
.contact-intro > p:not(.contact-eyebrow) { font-size: 1.15rem; line-height: 1.7; max-width: 430px; }
.contact-email { display: block; font-weight: 700; margin-top: 28px; overflow-wrap: anywhere; text-decoration: underline; text-underline-offset: 4px; }.contact-back { display: inline-block; margin-top: 30px; color: #7b551f; }
.contact-form { position: relative; border: 1px solid #d2c4a5; border-radius: 24px; padding: clamp(24px, 4vw, 40px); background: #fff9e9; box-shadow: 0 14px 40px #424b3514; }
h2 { font-family: 'Playfair Display', serif; font-size: 1.9rem; color: #ab6c0e; font-weight: 800; margin-bottom: 24px; }
label { display: block; font-weight: 700; font-size: .9rem; margin: 18px 0 7px; }
input, select, textarea { width: 100%; border: 1px solid #b8bca8; border-radius: 10px; padding: 12px; background: #fffdf6; color: #424b35; }
input:focus, select:focus, textarea:focus { outline: 2px solid #ab6c0e; outline-offset: 2px; }textarea { resize: vertical; }
.contact-privacy { font-size: .78rem; line-height: 1.5; margin: 15px 0; }.contact-trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
button { margin-top: 20px; width: 100%; padding: 15px 24px; border-radius: 999px; background: #677021; color: #fff9e9; font-weight: 700; }button:disabled { opacity: .55; cursor: not-allowed; }button:focus-visible { outline: 3px solid #ab6c0e; outline-offset: 3px; }
.contact-status { margin-top: 16px; font-size: .9rem; line-height: 1.5; }.contact-error { color: #9b332a; }
@media(min-width: 900px) { .contact-page { grid-template-columns: 1fr 1.15fr; gap: 70px; } }
</style>
