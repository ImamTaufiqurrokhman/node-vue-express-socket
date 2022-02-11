<template>
    <div class="px-4 py-5 my-5r">
        <div class="card">
            <div class="card-header">
                <h1 class="display-5 fw-bold text-cente">Edit Phone Number</h1>
            </div>
            <div class="card-body">
                <div class="mx-auto">
                    <div class="row mb-3">
                        <label for="inputPhoneNumber" class="form-label">Phone Number</label>
                        <input v-model="phone_number.number" type="phone" class="form-control" id="inputPhoneNumber">
                    </div>
                    <div class="row mb-3">
                        <label for="selectProvider" class="form-label">Provider</label>
                        <select v-model="phone_number.provider_id" class="form-control" id="selectProvider">
                            <option v-bind:key="provider.id" v-for="provider in providers" :value="provider.id" v-text="provider.name"/>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col m-l-auto">
                            <button @click="updateData()" class="btn btn-success m-2">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default{
    name: "EditView",
    data() {
        return {
            phone_number: {
                number: null,
                provider_id: 0
            },
            providers : [
                {
                    id: 0,
                    name: 'Select Provider'
                }
            ]
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        getProviderData() {
            this.http.get('/provider')
            .then(response => {
                this.providers.push(...response.data.msg)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getPhoneNumber() {
            this.http.get('/phone_number/' + this.id)
            .then(response => {
                this.phone_number.number = '0'+response.data.msg.number
                this.phone_number.provider_id = response.data.msg.provider_id
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateData() {
            if(this.phone_number.number && this.phone_number.provider_id) {
                this.http.put('/phone_number/' + this.id, this.phone_number)
                .then(response => {
                    console.log(response.data)
                    alert('Data telah diupdate.')
                    this.getPhoneNumber()
                })
                .catch(error => {
                    alert("Error")
                    console.log(error)
                })
            } else {
                alert('Phone number and provider must no be empty!')
            }
        }
    },
    inject: ['Vue3GoogleOauth'],
    created () {
        if (!this.Vue3GoogleOauth.isAuthorized) {
            this.$router.push('/')
        }
        this.getProviderData()
        this.getPhoneNumber()
    }
}
</script>