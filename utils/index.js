const axios = require('axios')

function defaultImage() {
    return {
        smimage: 'https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
        mdimage: 'https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb'
    }
}

module.exports = {
    upsplash: async (tags) => {
        try {
            if(Array.isArray(tags) && tags.length > 0) {
                const url = `https://api.unsplash.com/search/photos?&query=${tags[0]}&client_id=${process.env.SPLASH_KEY}`
                const result = await axios.get(url)
                const img_arr = result.data.results
                if(Array.isArray(img_arr) && img_arr.length > 0) {
                    return {
                        smimage: img_arr[0].urls.small,
                        mdimage: img_arr[0].urls.full
                    }
                } else {
                    return defaultImage()
                }
            } else {
                return defaultImage()
            }
        } catch(err) {

            console.log(err)
            return defaultImage()
        }
    }
}