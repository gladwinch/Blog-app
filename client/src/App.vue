<template>
	<v-app>
		<app-bar></app-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import AppBar from './components/AppBar';
import axios from 'axios'

function readCookie(name) {
    let nameEQ = name + "="
    let ca = document.cookie.split(';')
    for(let i=0;i < ca.length;i++) {
        let c = ca[i]
        while (c.charAt(0)==' ') c = c.substring(1,c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
    }
    return null
}

export default {
	name: 'App',

	components: {
		AppBar,
	},

	data: () => ({
		//
	}),

	async mounted() {
		if(!this.$store.getters['auth/getUser'] && (readCookie('authorize') === 'user-authorize')) {
			let response = await axios.get('/api/user/user')
			this.$store.commit('auth/updateUser', response.data.data)
			
			if(response.data.data && this.$route.name !== 'BlogList') {
				this.$router.push('/home')
			}
		}
	}
};
</script>

<style>
	@import url('./css/main.css');
</style>