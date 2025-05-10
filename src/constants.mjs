// Instancia de Axios preconfigurada para consumir la API de TMDB
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': 'bbda25d057b9c8c6bbf7f6966d3f9f1b',  // Clave de API pública
        'language': 'es-MX'                            // Idioma de respuesta
    }
});

export { api };