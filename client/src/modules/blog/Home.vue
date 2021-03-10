<template>
    <div class="pa-8 justify-center ">
        <h4 class="mb-4 text-center">Welcome {{ username }}</h4>
        <div class="d-flex justify-center">
            <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="grey-400"
                            dark
                            large
                            rounded
                            class="ct-shadow mb-8 mx-auto"
                        >
                            Post blog
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="headline green--text">
                            Create Blog
                        </v-card-title>

                        <v-card-title class="headline lighten-2">
                            <v-text-field
                                label="Title"
                                solo
                                v-model="title"
                            ></v-text-field>
                        </v-card-title>

                        <v-card-text>
                            <v-textarea
                                    v-model="body"
                                    solo
                                    color="teal"
                                >
                                <template v-slot:label>
                                    <div>
                                        What's on your mind? <small></small>
                                    </div>
                                </template>
                            </v-textarea>
                        </v-card-text>

                        <v-card-text>
                            <v-combobox
                                solo
                                v-model="tags"
                                :items="tags"
                                hide-selected
                                hint="Maximum of 5 tags (press enter to add tag)"
                                label="Add some tags"
                                multiple
                                small-chips
                            >
                            </v-combobox>
                        </v-card-text>

                        <v-divider></v-divider>

                        <div class="d-flex">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="red"
                                    text
                                    @click="dialog=false"
                                >
                                    Close
                                </v-btn>
                            </v-card-actions>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="createBlog"
                                    :loading="loading"
                                >
                                    Create
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-dialog>
            </div>
        </div>

        <v-divider></v-divider>     

        <div class="grid-container" >
            <Blog @deleteBlog="($event) => deleteBlog($event)" :blog="x" v-for="x in $store.getters['blog/getBlogs']" :key="x._id" />
        </div>
    </div>
</template>

<script>
    import Blog from './Blog'
    import axios from 'axios'
    export default {
        data: () => ({
            dialog: false,
            title: '',
            body: '',
            tags: [],
            loading: false
        }),
        components: {
            Blog
        },
        computed: {
            username() {
                if(this.$store.getters['auth/getUser']) {
                    return this.$store.getters['auth/getUser'].name
                } else {
                    return ''
                }
            }
        },
        methods: {
            async loadBlogs() {
                console.log("loading blogs")
                try {
                    let result = await axios.get('/api/blog')
                    this.commitBlogs(result)
                } catch (err) {
                    console.log(err)
                }
            },
            async createBlog() {
                if(this.title && this.body) {
                    this.loading = true
                    let result = await axios.post('/api/blog', {
                        title: this.title,
                        body: this.body,
                        tags: this.tags
                    })
                    this.commitBlogs(result)
                }

                this.title = ''
                this.body = ''
                this.tags = []
                this.dialog = false
                this.loading = false
            },
            commitBlogs(result) {
                result = result.data.data
                if(Array.isArray(result) && result.length > 0) {
                    this.$store.commit('blog/updateBlog', result)
                }
            },
            async deleteBlog(id) {
                let result = await axios.delete(`/api/blog/${id}`)
                this.commitBlogs(result)
            }
        },
        async beforeMount() {
            if(!this.$store.getters['auth/getUser']) {
                try {
                    let response = await axios.get('/api/user/user')
                    this.$store.commit('auth/updateUser', response.data.data)
                    this.user = response.data.data
                } catch (err) {
                    console.log(err)
                    this.$router.push('/')
                }

            }
        },
        async mounted() {
            await this.loadBlogs()
        }
    }
</script>