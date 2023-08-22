import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const TMDB_API_KEY = import.meta.env.VITE_APP_API_KEY;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url,params) =>{
    try {
        const {data} = await axios.get(BASE_URL+url+'?&api_key='+TMDB_API_KEY)
        return data
    } catch (error) {
        return error
    }
}