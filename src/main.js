import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import gAuthPlugin from 'vue3-google-oauth2';
import axios from "axios";
import socket from '@/plugins/socket'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api"
});

let gauthClientId = "1045846826707-p0vu22ae02l401vdf90i77ggp0ia4do8.apps.googleusercontent.com";

app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })
app.use(router)
app.use(socket, {
    connection: 'http://localhost:4000',
    options: {}
})

app.config.globalProperties.http = axiosInstance

app.mount('#app')
