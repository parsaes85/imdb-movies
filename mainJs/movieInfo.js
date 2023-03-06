let $ = document
const headerImg = $.querySelector('header img')
const movieImg = $.querySelector('.movie-img')
const movieTitle = $.querySelector('.movie-title')
const movieCountry = $.querySelector('.movie-country')
const movieGenres = $.querySelector('.movie-genres')
const details = $.querySelector('.details')
const movieImages = $.querySelector('.movie-images')
let searchURL = location.search
let movieIdParam = new URLSearchParams(searchURL).get('movieId')

// get infos for selected movie
const fetchData = ( async () => {
    try {
        let res = await fetch(`https://moviesapi.ir/api/v1/movies/${movieIdParam}`)
        let data = await res.json()
        showData(data)
        
        removeLoader()
    } catch (error) {
        console.log(error)
        refreshMessage()
    }
})();

// show infos for selected movie
const showData = (movie) => {
    console.log(movie)
    headerImg.src = movie.poster
    movieImg.src = movie.poster
    movieTitle.innerText = movie.title
    movieCountry.innerText = `Country Of Origin: ${movie.country}`
    movie.genres.forEach(genre => {
        movieGenres.insertAdjacentHTML('beforeend', `
            <span class="text-xs bg-movieBg p-1 px-2 rounded-md opacity-90 md:text-lg">${genre}</span>
        `)
    })

    details.innerHTML = `
    <div>name: <span class="ml-2">${movie.title}</span></div>
    <div>IMDB Rating: <span class="ml-2">${movie.imdb_rating}</span></div>
    <div>Genres: <span class="ml-2">${movie.genres}</span></div>
    <div>Released: <span class="ml-2">${movie.released}</span></div>
    <div>Time: <span class="ml-2">${movie.runtime}</span></div>
    <div>Awards: <span class="ml-2">${movie.awards}</span></div>
    <div>Director: <span class="ml-2">${movie.director}</span></div>
    <div>Actors: <span class="ml-2">${movie.actors}</span></div>
    <div>Storyline: <span class="ml-2">${movie.plot}</span></div>
    `

    if(movie.images) {
        movie.images.forEach(image => {
            movieImages.insertAdjacentHTML('beforeend', `
                <img class="w-96" src="${image}" alt="">
            `)
        })
    }
}
