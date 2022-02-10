import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import gAuthPlugin from 'vue3-google-oauth2';

const app = createApp(App)

// let gauthClientId = "768834812579-ivi0oopbkqe05cg6t41p83t7gteekut6.apps.googleusercontent.com";
let gauthClientId = "1045846826707-p0vu22ae02l401vdf90i77ggp0ia4do8.apps.googleusercontent.com";

app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })
app.use(router)

app.mount('#app')
