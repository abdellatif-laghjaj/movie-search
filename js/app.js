const { createApp } = Vue

createApp({
    data() {
        return {
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: {},
            error_message: ''
        }
    },
    methods: {
        searchMovie() {
            this.movie = {}
            fetch(this.url + this.search + '&apikey=' + this.api_key)
                .then(response => response.json())
                .then(data => {
                    this.movie = data;
                    console.log(this.movie)
                })
                .catch(error => this.error_message = error)
        },
        validateSearch() {
            if (this.search.length > 0) {
                this.searchMovie()
            }else{
                this.movie = {}
                this.error_message = 'Please enter a movie title'
            }
        }
    },
}).mount('#app')