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
                    console.log(data)
                    this.movie.title = data.Title
                    this.movie.released = data.Released
                    this.movie.poster = data.Poster
                    this.movie.plot = data.Plot
                    this.movie.actors = data.Actors.split(', ')
                    this.movie.genre = data.Genre.split(', ')
                    this.movie.imdbRating = data.imdbRating
                    this.movie.imdbVotes = data.imdbVotes
                    this.movie.runtime = this.minutesToHours(data.Runtime)
                })
                .catch(error => this.error_message = "Movie not found");
        },
        validateSearch() {
            if (this.search.length > 0) {
                this.searchMovie()
            }else{
                this.movie = {}
                this.error_message = 'Please enter a movie title'
            }
        },
        minutesToHours(minutes) {
            const mins = minutes.replace(/\D/g, '')
            return Math.floor(mins / 60) + 'h ' + mins % 60 + 'm'
        }
    },
    created() {
        this.movie = {
            title: 'Deadpool',
            released: '12 Feb 2016',
            poster: 'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
            plot: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.',
            actors: ['Ryan Reynolds', 'Morena Baccarin', 'T.J. Miller'],
            genre: ['Action', 'Adventure', 'Comedy'],
            imdbRating: '8.0',
            imdbVotes: '1,010,228',
            runtime: '1h 58m',
        }
    },
}).mount('#app')