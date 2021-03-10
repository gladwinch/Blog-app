<template>
    <v-container>
        <div class="mt-10 pl-12">
            <router-link to="/">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="../../assets/left.png"
                    transition="scale-transition"
                    width="40"
                />
            </router-link>
        </div>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="ct-shadow pa-6 rounded ma-4 mt-12 mx-auto"
            style="max-width: 20rem"
        >
            <div class="d-flex justify-center">
                <v-img
                    alt="Sew Logo"
                    class="shrink mr-2"
                    contain
                    src="../../assets/xing.png"
                    transition="scale-transition"
                    width="40"
                />

                <h2><span class="primary--text">Se</span>wlog</h2>
            </div>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>

            <v-btn
                style="width: 100%"
                class="primary ct-shadow mt-2"
                @click="login"
                :loading="loading"
            >
                Login
            </v-btn>

            <div class="subtitle-2 d-flex mt-4">
                <p class="mr-2">Don't have an account</p>
                <router-link to="/register">
                    <span class="primary--text">Register</span>
                </router-link>
            </div>

            <div v-if="errorMessage" class="red--text text-center subtitle-2">{{ errorMessage }}</div>
        </v-form>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length > 2) || 'Name must be more than 2 characters',
            ],
            loading: false,
            errorMessage: ''
        }),

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            async login() {
                this.$refs.form.validate()

                try {
                    if(/.+@.+\..+/.test(this.email) && this.password.length > 2) {
                        this.loading = true
                        let userData = await axios.post('/api/user/login', {
                            email: this.email,
                            password: this.password
                        })

                        this.loading = true
                        this.$refs.form.reset()
                        this.$refs.form.resetValidation()

                        const { success, data } = userData.data

                        if(success && data.email) {
                            this.$store.commit('auth/updateUser', data)
                            this.$router.push('/home')
                        }
                    }
                } catch (err) {
                    this.loading = false
                    console.log(err)
                    this.errorMessage = err.response.data.error
                }
            }
        }
    }
</script>

