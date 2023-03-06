// go to movie info page

const goToMovieInfo = (id) => {
    location.href = `movieInfo.html?movieId=${id}`
    searchInput.value = ''
}

