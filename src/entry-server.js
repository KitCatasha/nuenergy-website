import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import App from './App.vue';

export async function render(path = '/') {
  return renderToString(createSSRApp(App, { path }));
}