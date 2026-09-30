import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import './css/app.css';
import 'aos/dist/aos.css';

const root = document.querySelector('#app');
const props = { path: window.location.pathname };

const app = root.firstElementChild
  ? createSSRApp(App, props)
  : createApp(App, props);

app.mount(root);