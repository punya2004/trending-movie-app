import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../Components/SingleContent/SingleContent';
import './Trending.css'

function Trending() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState()

    const fetchTrending = async() => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=57b6b1332b954019bd14ea531362ad12&language=en-US`
          );
          setContent(data.results);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
         // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
               {content.map(function ite(item) {
                   return(
                    <SingleContent 
                        key={item.id}
                        id={item.id}
                        poster={item.poster_path}
                        title={item.title || item.name}
                        date={item.first_air_date || item.release_date}
                        media_type={item.media_type}
                        vote_average={item.vote_average}
                    />
                   )                  
               })}
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending
