<script>
export default {
  name: "HomeView",
  inject: ['Vue3GoogleOauth'],
  methods : {
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
        this.$router.push('/input')
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    }
  }
}
</script>

<template>
  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">JTI-TEST-NODE</h1>
    <div class="col-lg-6 mx-auto">
      <!-- <p class="lead mb-4">Aplikasi ini dibuat dengan menggunakan node js sebagai runtim</p> -->
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button v-show="!Vue3GoogleOauth.isAuthorized" @click="handleClickSignIn" type="button" class="btn btn-primary btn-lg px-4 gap-3">Masuk dengan Google</button>
      </div>
    </div>
  </div>
</template>
