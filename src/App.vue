<script>
import { inject, toRefs } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import 'bootstrap/scss/bootstrap.scss'

export default {
  name: "JtiTestNode",
  props: {
    msg: String,
  },
  components: {
    RouterLink,
    RouterView,
    HelloWorld
  },
  data(){
    return {
      user: '',
    }
  },

  methods: {
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
      } catch (error) {
        console.error(error);
      }
      this.$router.push('/')
    }
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
};
</script>

<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            JTI-TEST-NODE
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><RouterLink to="/" class="nav-link px-2 text-secondary">Home</RouterLink></li>
            <li><RouterLink to="/input" v-show="Vue3GoogleOauth.isAuthorized" class="nav-link px-2 text-white">Input</RouterLink></li>
            <li><RouterLink to="/output" v-show="Vue3GoogleOauth.isAuthorized" class="nav-link px-2 text-white">Output</RouterLink></li>
          </ul>

          <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
          </form> -->

          <div class="text-end">
            <!-- <button type="button" class="btn btn-outline-light me-2">Login</button> -->
            <button v-show="Vue3GoogleOauth.isAuthorized" @click="handleClickSignOut" type="button" class="btn btn-danger">Sign-out</button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <div>
        <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
        <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
        <h2 v-if="user">signed user: {{user}}</h2>
        <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign in</button>
        <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

      </nav>
    </div>

   -->
</template>
