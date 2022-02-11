<template>
    <div class="px-4 py-5 my-5r">
        <div class="card">
            <div class="card-header">
                <h1 class="display-5 fw-bold text-cente">Input Phone Number</h1>
            </div>
            <div class="card-body">
                <div class="mx-auto">
                    <div class="row mb-3">
                        <label for="inputPhoneNumber" class="form-label">Phone Number</label>
                        <input v-model="inputData.number" type="phone" class="form-control" id="inputPhoneNumber">
                    </div>
                    <div class="row mb-3">
                        <label for="selectProvider" class="form-label">Provider</label>
                        <select v-model="inputData.provider_id" class="form-control" id="selectProvider">
                            <option v-bind:key="provider.id" v-for="provider in providers" :value="provider.id" v-text="provider.name"/>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col m-l-auto">
                            <button @click="storeData()" class="btn btn-success m-2">Save</button>
                            <button @click="autoCreateData()" class="btn btn-primary m-2">Auto</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default{
    name: "InputView",
    data() {
        return {
            inputData: {
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
    methods: {
        getProviderData() {
            this.http.get('/provider')
            .then(response => {
                this.providers.push(...response.data.msg)
                console.log(response.data)
            })
            .catch(error => {
                // alert("Error")
                console.log(error)
            })
        },
        storeData() {
            if(this.inputData.number && this.inputData.provider_id) {
                this.http.post('/phone_number', this.inputData)
                .then(response => {
                    console.log(response.data)
                    alert('Data telah disimpan.')
                    this.$router.push('/output')
                })
                .catch(error => {
                    alert("Error")
                    console.log(error)
                })
            } else {
                alert('Phone number and provider must no be empty!')
            }
        },
        autoCreateData() {
            this.http.post('/phone_number/auto', this.inputData)
            .then(response => {
                alert('Data telah disimpan.')
                console.log(response.data)
                this.$router.push('/output')
            })
            .catch(error => {
                alert("Error")
                console.log(error)
            })
        }
    },
    inject: ['Vue3GoogleOauth'],
    created () {
        if (!this.Vue3GoogleOauth.isAuthorized) {
            this.$router.push('/')
        }
        this.getProviderData()
    }
}
</script>