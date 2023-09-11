const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    const filteredMovies = filter
        ? movies.filter(movie => movie.info.title.includes(filter))
        : movies;

    filteredMovies.forEach(movie => {
        const movieEl = document.createElement('li');

        // if (!('info' in movie)) return --> check using 'in' operator

        const { info, ...otherProps } = movie;
        console.log(otherProps);

        // const { title: movieTitle } = info;
        let { getFormattedTitle } = movie;
        // getFormattedTitle = getFormattedTitle.bind(movie);
        let text = getFormattedTitle.call(movie) + ' - ';
        // .call() and .apply() are similar, but 'apply' as a 2nd arg gets an array

        for (const key in info) {
            if (key !== 'title' && key !== '_title') {
                text = text + `${key}: ${info[key]}`;
            }
        }

        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') return;

    const newMovie = {
        info: {
            set title(value) {
                if (val.trim() === '') {
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = value;
            },
            get title() {
                return this._title;
            },
            title,
            [extraName]: extraValue
        },
        id: Math
            .floor(Math.random() * 10000)
            .toString(),
        getFormattedTitle() {
            return this.info.title.toUpperCase();
        }
    };

    newMovie.info.title = title;
    console.log(newMovie.info.title);

    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
