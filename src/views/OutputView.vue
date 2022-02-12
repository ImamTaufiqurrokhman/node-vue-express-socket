<template>
    <div class="container pt-2">
        <div class="row mb-2">
            <div class="col">
                <a @click="deleteAllPhoneNumbers()" class="btn btn-danger m-l-auto">Delete ALL</a>
            </div>
        </div>
        <div class="row">
            <div class="col mb-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Odd</h3>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>Phone Number</th>
                                    <th>Provider</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-bind:key="phone_number.id" v-for="(phone_number, index) in odd_number">
                                    <td>{{index + 1}}</td>
                                    <td>{{'0' + phone_number.number}}</td>
                                    <td>{{phone_number.provider.name}}</td>
                                    <td>
                                        <button @click="editPhoneNumber(phone_number.id)" class="btn btn-warning">Edit</button>
                                    </td>
                                    <td>
                                        <button @click="deletePhoneNumber(phone_number)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Even</h3>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>Phone Number</th>
                                    <th>Provider</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-bind:key="phone_number.id" v-for="(phone_number, index) in even_number">
                                    <td>{{index + 1}}</td>
                                    <td>{{'0' + phone_number.number}}</td>
                                    <td>{{phone_number.provider.name}}</td>
                                    <td>
                                        <button @click="editPhoneNumber(phone_number.id)" class="btn btn-warning">Edit</button>
                                    </td>
                                    <td>
                                        <button @click="deletePhoneNumber(phone_number)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sound from '@/assets/sms-alert-1-daniel_simon.wav'
export default {
    name: "OutputView",
    data() {
        return {
            phone_numbers: []
        }
    },
    computed: {
        odd_number() {
            return this.phone_numbers.filter(phone_number => phone_number.number % 2 != 0)
        },
        even_number() {
            return this.phone_numbers.filter(phone_number => phone_number.number % 2 == 0)
        }
    },
    methods: {
        getPhoneNumber() {
            this.http.get('/phone_number')
            .then(response => {
                this.phone_numbers = response.data.msg
                console.log(response.data.msg)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deletePhoneNumber(phone_number) {
            let isDelete = confirm("Apakah anda yakin akan menghapus nomor telefon ini?")
            if (isDelete) {
                this.http.delete('/phone_number/' + phone_number.id)
                .then(response => {
                    alert('Data telah dihapus!')
                    this.getPhoneNumber()
                })
                .catch(error => {
                    console.log(error);
                    alert("Data gagal dihapus!")
                })
            } else {
                alert('Data tidak dihapus')
            }
        },
        deleteAllPhoneNumbers() {
            let isDelete = confirm("Apakah anda yakin akan menghapus semua data?")
            if (isDelete) {
                this.http.delete('/phone_number/all')
                .then(response => {
                    alert('Data telah dihapus!')
                    this.getPhoneNumber()
                })
                .catch(error => {
                    console.log(error);
                    alert("Data gagal dihapus!")
                })
            } else {
                alert('Data tidak dihapus')
            }
        },
        editPhoneNumber(phone_number_id) {
            this.$router.push('/edit/' + phone_number_id)
        },
        notification() {
            const audio = new Audio(sound)
            audio.play()
        }
    },
    inject: ['Vue3GoogleOauth'],
    created () {
        if (!this.Vue3GoogleOauth.isAuthorized) {
            this.$router.push('/')
        } else {
            this.getPhoneNumber()
        }
        this.$socket.on("new_data_from_server", (arg) => {
            this.getPhoneNumber()
            this.notification()
        });
    }
}
</script>