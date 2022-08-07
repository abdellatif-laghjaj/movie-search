const { createApp } = Vue

createApp({
    data() {
        return {
            url: 'http://www.omdbapi.com/?t=',
            api_key: 'b60d4db',
            search: '',
            movie: null,
            error_message: '',
            isLoaded: false,
        }
    },
    methods: {
        searchMovie() {
            this.movie = {};
            fetch(this.url + this.search + '&apikey=' + this.api_key)
                .then(response => response.json())
                .then(data => {
                    this.movie.title = data.Title
                    this.movie.released = data.Released
                    this.movie.poster = data.Poster
                    this.movie.plot = data.Plot
                    this.movie.actors = data.Actors.split(', ')
                    this.movie.genre = data.Genre.split(', ')
                    this.movie.imdbRating = data.imdbRating
                    this.movie.imdbVotes = data.imdbVotes
                    this.movie.runtime = this.minutesToHours(data.Runtime)

                    this.error_message = ''
                })
                .catch(error => {
                    this.movie = null
                    this.error_message = "Movie not found"
                })
        },
        validateSearch() {
            if (this.search.length > 0) {
                this.searchMovie()
            }else{
                this.error_message = 'Please enter a movie title'
                this.movie = null
            }
        },
        minutesToHours(minutes) {
            const mins = minutes.replace(/\D/g, '')
            return Math.floor(mins / 60) + 'h ' + mins % 60 + 'm'
        },
        slicePlot() {
            //check if width is less than 408px
            if (window.innerWidth < 408) {
                //slice the plot text to fit in the container
                const plot = document.querySelector('.plot')
                plot.innerHTML = plot.innerHTML.slice(0, 200) + '...'
            }
        },
        loader(){
            setTimeout(() => {
                this.isLoaded = true;
            }, 4500);
        },
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
        this.slicePlot();
        this.loader();
    },
}).mount('#app')