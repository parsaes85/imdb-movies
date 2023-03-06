// https://rapidapi.com/SAdrian/api/moviesminidatabase/

const movieContainer = document.querySelectorAll('.movie-container')

// fetch movie data
const fetchData = async (id) => {
    try {
        let res = await fetch(`https://moviesapi.ir/api/v1/genres/${id}/movies?page=1`)
        let data = await res.json()
        removeLoader()
        return data
    } catch (error) {
        refreshMessage()
    }
}

// show movie data
const showData = (movies, container) => {
    movies.forEach(movie => {
        container.insertAdjacentHTML('beforeend', `
        <div class="movie relative hover:translate-y-2 transition cursor-pointer" onclick="goToMovieInfo(${movie.id})">
            <img src="${movie.poster}" class="rounded-lg h-48 md:h-80" alt="">
            
            <div class="p-3">
                <h1 class="text-mainTextColor text-xs md:text-xl mb-2">${movie.title}</h1>

                <div class="flex text-secondTextColor text-[10px] md:text-base">
                    <span>${movie.country}</span>
                    <span class="mx-1">|</span>
                    <span>${movie.year}</span>
                </div>
            </div>

            <span class="absolute top-0 left-0 bg-movieBg text-mainTextColor p-[6px] text-xs md:text-sm rounded-tl-lg">${movie.imdb_rating}</span>
        </div>
        `)
    })
}

// get different movie genres
movieContainer.forEach(container => {
    let genresId = container.dataset.genresid

    fetchData(genresId).then(movies => showData(movies.data, container))
})


