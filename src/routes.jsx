import Index from "./pages/Index/Index"
import MovieInfo from "./pages/MovieInfo/MovieInfo"
import Movies from "./pages/Movies/Movies"
import FavoriteMovies from "./pages/FavoriteMovies/FavoriteMovies"

const routes = [
    { path: "/", element: <Index /> },
    { path: "/movie-info/:movieID", element: <MovieInfo /> },
    { path: "/movies/:genreID", element: <Movies /> },
    { path: "/favorite-movies", element: <FavoriteMovies /> },
]

export default routes