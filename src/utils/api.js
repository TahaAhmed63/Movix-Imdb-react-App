import axios from 'axios';

const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODgzODhkYzcyNGJhNjdhZTU4NWRhNGNkZWUxOGE1NiIsInN1YiI6IjY0MDYyN2UzMDIxY2VlMDBiNGZmNzU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ri8gePeVmLCtRryo8WUM6ja2VySmMNDVOm8a2Nk3VIA";

const headers = {
    Authorization:"bearer "+ 
    TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

