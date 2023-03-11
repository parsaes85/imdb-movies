const genreMovieContainer = document.querySelector('.genre-movie-container')
const nextMoviesPageLoader = document.querySelector('.next-movies-page-loader')
const genreTitle = document.querySelector('.genre-title')

let searchURL = location.search
let movieIdParam = new URLSearchParams(searchURL).get('genreId')
const body = document.body
let page = 1

// get and show title of selected genre
const getGenreName = ( async () => {
    let res = await fetch('https://moviesapi.ir/api/v1/genres')
    let data = await res.json()

    const mainGenre = data.find(genre => {
        return genre.id == movieIdParam
    })
    genreTitle.innerText = mainGenre.name

    setWebTitle(mainGenre.name)
})();

// set web title
const setWebTitle = (titleName) => {
    document.title = titleName + ' Movies'
}

// get selected genre movies
const fetchData = async () => {
    try {
        let res = await fetch(`https://moviesapi.ir/api/v1/genres/${movieIdParam}/movies?page=${page}`)
        let data = await res.json()
        showData(data.data)

        if(!data.data.length) {
            nextMoviesPageLoader.classList.replace('flex', 'hidden')
        }

        removeLoader()
    } catch (error) {
        console.log(error)
        refreshMessage()
    }
};
fetchData()

// show selected genre movies
const showData = (movies) => {
    movies.forEach(movie => {
        genreMovieContainer.insertAdjacentHTML('beforeend', `
        <div class="relative hover:translate-y-2 transition cursor-pointer md:w-52" onclick="goToMovieInfo(${movie.id})">
            <img src="${movie.poster}" class="rounded-lg w-20 md:w-52" alt="">
            
            <div class="py-3">
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

// when we go end of the site next movies show
window.addEventListener('scroll', e => {
    if(window.innerHeight + window.pageYOffset >= body.scrollHeight) {
        page++
        console.log(page)

        fetchData()
    }
})