<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  inject: ['Vue3GoogleOauth'],
  beforeMount() {
    if (!this.Vue3GoogleOauth.isAuthorized) {
      console.log("Tak boleh sayang")
    }
  }
}
</script>
 