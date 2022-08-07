const { createApp } = Vue

createApp({
    data() {
        return {
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: {},
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
                .catch(error => console.log(error));
        },
        validateSearch() {
            if (this.search.length > 0) {
                this.searchMovie()
            }else{
                this.movie = {}
                alert('Please enter a movie title');
            }
        }
    },
}).mount('#app')