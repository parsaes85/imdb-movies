const searchMoviesContainer = document.querySelector('.search-movies-container')
const searchBtn = document.querySelector('.bx-search')
const searchInput = document.querySelector('.search-input')

// get searched movie
const searchMovie = async (value) => {
    if(!value) {
        hideSearchMoviesContainer()
    }else {
        searchMoviesContainer.innerHTML = 'Searching ...'
        let res = await fetch(`https://moviesapi.ir/api/v1/movies?q=${value}`)
        let data = await res.json()
            
        showMovie(data.data)
    }
}

// show searched movie
const showMovie = (movies) => {
    searchMoviesContainer.classList.add('max-h-80')
    searchMoviesContainer.innerHTML = ''
    searchMoviesContainer.classList.remove('hidden')
    movies.forEach(movie => {
        searchMoviesContainer.insertAdjacentHTML('beforeend', `
        <div class="flex w-full rounded-lg bg-[#0e0e0f] border-b border-b-movieBg cursor-pointer hover:bg-[#222225]" onclick="goToMovieInfo(${movie.id})">
            <img class="w-16 h-22 rounded-lg" src="${movie.poster}" alt="">
            <div class="space-y-1 ml-2">
                <h1 class="md:text-lg">${movie.title}</h1>
                <h1 class="text-xs md:text-sm">${movie.year}</h1>
                <h1 class="text-xs md:text-sm">${movie.country}</h1>
            </div>
        </div>
        `)
    })

    if(!movies.length) {
        searchMoviesContainer.innerHTML = 'Nothing Found'
    }
}

const hideSearchMoviesContainer = () => {
    searchMoviesContainer.innerHTML = ''
    searchMoviesContainer.classList.add('hidden')
}

searchBtn.addEventListener('click', e => {
    searchMovie(searchInput.value)
})
searchInput.addEventListener('keydown', e => {
    if(e.keyCode == 13) {
        searchMovie(searchInput.value)
    }
})

// actions for closing search list
window.addEventListener('click', e => {
    if(['BODY', 'NAV'].includes(e.target.nodeName)) {
        hideSearchMoviesContainer()
    }
})
window.addEventListener('scroll', e => {
    hideSearchMoviesContainer()
})
