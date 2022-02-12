<script>
import { inject, toRefs } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import 'bootstrap/scss/bootstrap.scss'
import sound from './assets/sms-alert-1-daniel_simon.wav'

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
    },
    notification() {
      const audio = new Audio(sound)
      audio.play()
      .then(() => {
        let confirmation = confirm("Data is stored. Would you like to check it?")
        if (confirmation) {
          this.$router.push("/output")
        }
      })
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
  created() {
    this.$socket.on("connect", () => {
      console.log(this.$socket.id);
    });

    this.$socket.on("disconnect", () => {
      console.log(this.$socket.id);
    });

    this.$socket.on("new_data_from_server", (arg) => {
      this.notification()
    });
  }
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
          <div class="text-end">
            <button v-show="Vue3GoogleOauth.isAuthorized" @click="handleClickSignOut" type="button" class="btn btn-danger">Sign-out</button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
