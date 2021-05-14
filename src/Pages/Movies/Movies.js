import axios from "axios"
import { useEffect, useState } from "react"
import Genres from "../../Components/Genres"
import CustomPagination from "../../Components/Pagination/CustomPagination"
import SingleContent from "../../Components/SingleContent/SingleContent"
import useGenre from "../../hooks/useGenre"

const Movies = () => {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);

    const fetchMovie = async() => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=57b6b1332b954019bd14ea531362ad12&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
            )
            setContent(data.results)
            setNumOfPages(data.total_pages)
    }
    
    useEffect(() => {
    window.scroll(0, 0);
      fetchMovie();
       // eslint-disable-next-line  
    }, [page, genreforURL])

    return (
        <div>
             <span className="pageTitle">Movies</span>
             <Genres 
                type="movie" 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
             <div className="trending">
               {content.map(function ite(item) {
                   return(
                    <SingleContent 
                        key={item.id}
                        id={item.id}
                        poster={item.poster_path}
                        title={item.title || item.name}
                        date={item.first_air_date || item.release_date}
                        media_type="movie"
                        vote_average={item.vote_average}
                    />
                   )                  
               })}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numofpages={numOfPages}/>
            )}            
        </div>
    )
}

export default Movies
