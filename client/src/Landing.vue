<template>
    <div class="d-flex align-center justify-center" style="height: 90vh">
        <v-img
            alt="Landing img"
            class="shrink mr-2 hide-sm"
            contain
            src="./assets/home.png"
            transition="scale-transition"
            max-width="700"
        />

        <div style="max-width 10rem" class="ml-8">
            <h1 
                class="font-weight primary--text display-2">
                Start a new blog,
            </h1>
            <h1 
                class="font-weight primary--text display-2">
                build audience.
            </h1>
            <div class="subtitle-2 mt-6">
                Discover new reads, keep tabs on your site, upload on go,
            </div>
            <div class="subtitle-2">
                The world most popular bloggging app.
            </div>

            <router-link to="/login" style="text-decoration: none;">
                <v-btn
                    color="dark"
                    rounded
                    large
                    dark
                    class="text-capitalize mt-12 ct-shadow"
                >
                    Start now!
            </v-btn>
            </router-link>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
    
</style>