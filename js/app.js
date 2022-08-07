const { createApp } = Vue

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: {},
        }
    }
}).mount('#app')