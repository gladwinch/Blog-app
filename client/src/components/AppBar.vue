<template>
    <v-app-bar
      app
      color="white"
      class="ct-shadow"
    >
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="../assets/xing.png"
                transition="scale-transition"
                width="35"
            />
        </div>
        <h1><span class="primary--text">Se</span>wlog</h1>

        <v-spacer></v-spacer>

        <v-btn v-if="$store.getters['auth/getUser']"
            text
            @click="logout"
            class="text-capitalize red--text"
        >
            Logout
        </v-btn>

        <router-link v-else 
            to="/login" style="text-decoration: none; !important"
        >
            <v-btn
                text
                class="text-capitalize primary--text"
            >
                Login
            </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
    import axios from 'axios'
    
    export default {
        methods: {
            async logout() {
                await axios.get('/api/user/logout')
                this.$store.commit('auth/updateUser', null)
                this.$router.push('/')
            }
        }
    }
</script>