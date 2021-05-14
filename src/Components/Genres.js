import { Chip } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
          );
          setGenres([...genres, genre]);
          setPage(1);
    }

    const fetchGenres = async() => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=57b6b1332b954019bd14ea531362ad12&language=en-US`
            )
            setGenres(data.genres)
    }
    //console.log(genres)
    useEffect(() => {
        fetchGenres();

        return() => {
            setGenres({})
        }
// eslint-disable-next-line
    },[])

    return (
        <div style={{ padding: "6px 0" }}>
    {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}

         {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
        </div>
    )
}

export default Genres