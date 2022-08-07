const { createApp } = Vue

createApp({
    data() {
        return {
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: {
                title: '',
                released: '',
                poster: '',
                plot: '',
                actors: [],
                director: '',
                writer: '',
                genre: [],
                imdbRating: '',
                imdbVotes: '',
                runtime: '',
            },
            error_message: '',
        }
    },
    methods: {
        searchMovie() {
            this.movie = {}
            fetch(this.url + this.search + '&apikey=' + this.api_key)
                .then(response => response.json())
                .then(data => {
                    console.log(this.movie)
                    this.movie.title = data.Title
                    this.movie.released = data.Released
                    this.movie.poster = data.Poster
                    this.movie.plot = data.Plot
                    this.movie.actors = data.Actors.split(', ')
                    this.movie.director = data.Director
                    this.movie.writer = data.Writer
                    this.movie.genre = data.Genre.split(', ')
                    this.movie.imdbRating = data.imdbRating
                    this.movie.imdbVotes = data.imdbVotes
                    this.movie.runtime = data.Runtime
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
        },
    },
    created() {
        this.search = 'titanic'
        this.searchMovie();
    },
}).mount('#app')