<template>
    <v-card
        class="mx-auto my-12 ct-shadow"
        max-width="374"
    >
        <v-img
            height="250"
            :src="blog.smimage"
        ></v-img>

        <v-card-title class="primary--text">{{ blog.title }}</v-card-title>

        <v-card-text>

            <div class="my-4 subtitle-1">
                {{ blog.user.name }}
            </div>

            <div>{{ limitpara }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title style="font-size: 16px">Tags</v-card-title>

        <v-card-text>
            <v-chip-group
                active-class="deep-purple accent-4 white--text"
            >
                <v-chip v-if="blog.tags.length == 0">Default</v-chip>
                <v-chip v-for="(x, i) in blog.tags" :key="i">{{x}}</v-chip>
            </v-chip-group>
        </v-card-text>

        <v-card-actions>
            <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                                v-on="on"
                                color="deep-purple lighten-2"
                                text
                            >
                            Read More
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="showdelete"
                            color="red lighten-2"
                            text
                            @click="$emit('deleteBlog', blog._id)"
                        >
                            Delete
                        </v-btn>
                    </template>
                    <v-card>
                        <v-img
                            height="250"
                            :src="blog.mdimage"
                        ></v-img>
                        <v-card-title class="headline lighten-2">
                            {{ blog.title }}
                        </v-card-title>

                        <v-card-text>
                            {{ blog.body }}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
        }),

        props: ['blog'],
        computed: {
            limitpara() {
                return this.blog.body.split("").slice(0, 120).join("")+'...'
            },
            showdelete() {
                return this.blog.user._id === this.$store.getters['auth/getUser']._id
            }
        }
    }
</script>

<style>

</style>