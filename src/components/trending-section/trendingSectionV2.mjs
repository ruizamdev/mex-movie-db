import { api } from '/src/constants.mjs';
import { createMovieDetailsWindow } from '/src/main.mjs';

export class TrendingSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.populateTrendingSection();
    this.scrolling();    
  }

  disconnectedCallback() {
    
  }


  async populateTrendingSection() {
    // obtener todos los generos
    const { data: genresData } = await api('/genre/movie/list?language=es-MX');
    this.genreMap = new Map(genresData.genres.map(genre => [genre.id, genre.name]));

    // obtener top trending peliculas (20 items)
    const { data } = await api('/trending/movie/day?language=es_MX');
    const moviesSorted = data.results.sort((a, b) => b.popularity - a.popularity);
    
    // Crear las cards de cada pelicula
    moviesSorted.forEach((movie, idx) => this.createMovieCard(movie, idx + 1));
  }

  createMovieCard(movie, rank) {
    const container = document.createElement('li');
    container.classList.add('movie-container');

    // obtener generos de la pelicula
    const genreNames = (movie.genre_ids || []).map(id => this.genreMap.get(id) || 'Desconocido').join(', ');

    container.innerHTML = /* html */ `
      <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-details hidden">
        <span class="top-number"><strong>#${rank}</strong></span>
        <span class="movie-title"><strong>Titulo</strong>: ${movie.title}</span>
        <span class="movie-year"><strong>Año</strong>: ${movie.release_date.slice(0,4)}</span>
        <span class="movie-rate"><strong>Calificación</strong>: ${movie.vote_average.toFixed(1)}</span>
        <span class="movie-genres"><strong>Género</strong>: ${genreNames}</span>
        <button id="${movie.id}" class="movie-btn details-button">Ver detalles</button>
      </div>
    `;

    const details = container.querySelector('.movie-details');
    container.addEventListener('mouseenter', () => details.classList.remove('hidden'));
    container.addEventListener('mouseleave', () => details.classList.add('hidden'));

    const detailsButton = container.querySelector('.movie-btn.details-button');
    detailsButton.addEventListener('click', (e) => {
      const movieId = e.target.id;
      createMovieDetailsWindow(movieId);
    });

    this.shadowRoot.querySelector('.trendingPreview-movieList').appendChild(container);
  }

  scrolling() {
    const list = this.shadowRoot.querySelector('.trendingPreview-movieList');
    this.shadowRoot.querySelector('.scroll-btn.next')
        .addEventListener('click', () => list.scrollBy({ left: list.clientWidth, behavior: 'smooth' }));
    this.shadowRoot.querySelector('.scroll-btn.prev')
        .addEventListener('click', () => list.scrollBy({ left: -list.clientWidth, behavior: 'smooth' }));
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  getTemplate() {
    const tpl = document.createElement('template');
    tpl.innerHTML = /* html */ `
      <section class="trendingPreview">
        <h2>Top 20 Películas en Tendencias</h2>
          <ul class="trendingPreview-movieList">
          <button class="scroll-btn prev" aria-label="Anterior">\u276E</button>
          <button class="scroll-btn next" aria-label="Siguiente">\u276F</button>
            <!-- slides -->
          </ul>
      </section>
      <style>${this.getStyles()}</style>
    `;
    return tpl;
  }

  getStyles() {
    return /* css */ `
      :host {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .trendingPreview {
        position: relative;
        width: 98%;
      }

      li {
        list-style: none;
      }

      .scroll-btn {
        position: absolute;
        top: 50%;
        width: 4rem;
        height: 4rem;
        transform: translateY(50%);
        background: rgba(0,0,0,0.5);
        border: none;
        border-radius: 50%;
        color: var(--white);
        font-size: 2rem;
        padding: 0.8rem;
        cursor: pointer;
        z-index: 1;
      }

      .scroll-btn.prev {
        left: 0.5rem;
      }
      .scroll-btn.next {
        right: 0.5rem;
      }

      .trendingPreview h2 { 
        margin: 0;
        padding-block: 25px;
        padding-inline-start: 5px;
        font-size: clamp(1.6rem, 2vw, 2.4rem);
      }

      .trendingPreview-movieList { 
        display: flex;
        margin-block: 10px 0;
        gap: 1rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;

        /* Ocultar la barra de scroll */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE y Edge */
      }

      /* Default: 5 items */
      .trendingPreview-movieList li {
        flex: 0 0 calc((100% - 4 * 1rem) / 5);
        box-sizing: border-box;
      }

      /* ≤1200px: 3 items */
      @media (max-width: 1200px) {
        .trendingPreview-movieList li {
          flex: 0 0 calc((100% - 2 * 1rem) / 3);
        }
      }

      /* ≤768px: 2 items */
      @media (max-width: 768px) {
        .trendingPreview-movieList li {
          flex: 0 0 calc((100% - 1 * 1rem) / 2);
        }
      }

      .trendingPreview-movieList::-webkit-scrollbar {
        display: none; /* Chrome, Safari y Opera */
      }

      .movie-container {
        flex: 0 0 auto; /* No se expandirá ni contraerá */
        scroll-snap-align: start; /* Alinear al inicio del contenedor */
        position: relative; 
        width: 19.8%;
      }

      .movie-img {
          display: block;
          width: 100%;
      }
      .movie-details {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: min(1rem, 3vw);
        width: 100%;
        height: 100%;
        padding: min(2rem, 4vw);
        color: var(--white);
        background: rgba(0,0,0,0.85);
        outline: min(0.3rem, 0.5vw) solid var(--secondary-light-color);
        outline-offset: -5px;
        transition: all 0.3s ease-in-out;
      }

      .movie-details span {
        font-size: clamp(1.2rem, 2vw, 2rem);
        margin-inline: min(4rem, 6vw);
      }

      .movie-details span strong {
        color: var(--secondary-light-color);
      }

      .movie-details span.top-number {
        font-size: clamp(1.5rem, 3vw, 4rem);
      }

      .movie-btn {
        width: 50%;
        max-height: 42px;
        height: 4vh;
        margin: min(4rem, 6vw) auto;
        border-radius: 5px;
        padding: min(0.5rem, 1vw) min(1rem, 2vw);
        border: none;
        color: var(--primary-dark-color);
        background-color: var(--secondary-light-color);
        font-size: clamp(1.2rem, 2vw, 2rem);
        cursor: pointer;
      }

      .movie-btn:hover {
        background-color: var(--tertiary-light-color);
        color: var(--primary-dark-color);
        box-shadow: 0px 10px 20px -18px rgb(0, 0, 0, 0.35);
      }

      .inactive {
        display: none;
      }

      .hidden {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
      }

      @media (width <= 480px) {
        .trendingPreview h2 {
          padding-inline: 20px;
        }
      }
    `;
  }
}
