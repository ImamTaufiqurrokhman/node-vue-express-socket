<template>
    <div class="px-4 py-5 my-5r">
        <div class="card">
            <div class="card-header">
                <h1 class="display-5 fw-bold text-cente">Input</h1>
            </div>
            <div class="card-body">
                <div class="mx-auto">
                    <!-- <p class="lead mb-4">Aplikasi ini dibuat dengan menggunakan node js sebagai runtim</p> -->
                    <div class="d-grid gap-2 d-sm-flex">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-success m-2">Save</button>
                            <button type="submit" class="btn btn-primary m-2">Auto</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default{
    name: "InputView",
    inject: ['Vue3GoogleOauth'],
    created () {
        if (!this.Vue3GoogleOauth.isAuthorized) {
            this.$router.push('/')
        }
    }
}
</script>