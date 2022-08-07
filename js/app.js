const { createApp } = Vue

createApp({
    data() {
        return {
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: {},
        }
    }
}).mount('#app')