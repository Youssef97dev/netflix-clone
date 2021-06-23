import React, {useState, useEffect} from 'react';
import axios from './axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Rows({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {autoplay: 1},
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} onClick={() => handleClick(movie)} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Rows

/*
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzRiZGVhYWQzYTM1ZTU3YWNhZGQ5YzhjYjFkMzVkMCIsInN1YiI6IjYwYzhmYzIwMjQ3NmYyMDA0MGVhM2UwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QnitFrPBHtuJHhixseHjT67RtM60IL5_zDDDOo5YEA4

https://api.themoviedb.org/3/movie/550?api_key=c34bdeaad3a35e57acadd9c8cb1d35d0

c34bdeaad3a35e57acadd9c8cb1d35d0

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.6.7/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.6.7/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

41:50 min netflix video
*/


