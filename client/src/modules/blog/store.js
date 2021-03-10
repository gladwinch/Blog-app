export default {
    namespaced: true,
    state: {
        blog: null
    },
    mutations: {
        updateBlog(state, blogs) {
            state.blog = blogs
        }
    },
    getters: {
        getBlogs(state) {
            return state.blog
        }
    }
}
