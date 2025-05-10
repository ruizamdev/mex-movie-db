// movieDetailsWindow.mjs

import { api } from '../../constants.mjs'
export class MovieDetailsWindow extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Variables internas o bindings van aquí
    this.movieId = this.getAttribute('movie-id');
  }

  static get observedAttributes() {
    return ['movie-id']; // si necesitas escuchar atributos
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) 
    this.loadMovieDetails(newVal);
  }

  connectedCallback() {
    this.render();
    this.loadMovieDetails();
    // Listeners, inits, etc.
  }

  disconnectedCallback() {
    // Limpieza de listeners, intervals, observers, etc.
  }

  async loadMovieDetails(id) {
    if (!id) return;

    const { data: movie } = await api(`https://api.themoviedb.org/3/movie/${id}`);
    this.createMovieDetailsWindow(movie);
  }

  createMovieDetailsWindow(movie) {
    const container = document.createElement('section');
    container.classList.add('details-container');
    this.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    container.innerHTML = /* html */ `
      <div class="movie-poster-container">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
      </div>
      <div class="movie-details">
        <h2 class="movie-details__title">${movie.title}</h2>
        <div class="separator"></div>
        <p class="movie-details__original-title"><i>Título original: ${movie.original_title}</i></p>
        <span class="movie-details__release">Fecha de estreno: ${this.dateFormat(movie.release_date)}</span>
        <span class="movie-details__rate">Calificación: ⭐ ${movie.vote_average.toFixed(1)}</span>
        <span class="movie-details__genres">Género: ${movie.genres.map(genre => genre.name).join(', ')}</span>
        <span class="movie-details__runtime">Duración: ${movie.runtime} min.</span>
        <p class="movie-details__overview">${movie.overview}</p>
        <div class="movie-details__production">
          <span class="movie-details__production__title">Productoras:</span>
          <span class="movie-details__production__name">${(movie.production_companies || []).map(company => company.name).join(', ')}</span> 
      </div>
      <span class="movie-details__close">
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="currentColor"/>
        </svg>
      </span>
    `

    const detailsBtn = container.querySelector('.movie-details__close');
    detailsBtn.addEventListener('click', () => {
      this.remove();
      document.body.style.position = 'static';
      document.body.style.inset = '0';
    });

    this.shadowRoot.querySelector('.movie-details-container').appendChild(container);

  }

  dateFormat(targetDate) {
    const date = new Date(targetDate);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('es-MX', options).format(date);
  }

  getTemplate() {
    
    const template = document.createElement('template');
    template.innerHTML = /* html */ `
      <div class="movie-details-container">

      </div>
      <style>${this.getStyles()}</style>
    `;
    return template;
  }

  getStyles() {
    return /* css */ `

      * {
        margin: 0;
        padding: 0;
      }

      :host {
        position: absolute;
        width: 100%;
        height: 100vh;
        background-image: url('');
        background-size: cover;
        background-position: center;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 7;
      }

      .movie-details-container {
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.85);
        backdrop-filter: blur(5px);
      }

      .details-container {
        position: relative;
        display: flex;
        justify-content: center;
        gap: 3%;
        width: 100%;
        margin-block: 10vh;
        margin-inline: 5vw;
        padding-block: 10vh;
        padding-inline: 5vw;
      }

      .movie-poster-container {
        width: 16vw;
        min-width: 300px;
      }

      .movie-poster {
        width: 100%;
      }

      .movie-details {
        display: flex;
        flex-direction: column;
        width: 60%;
        height: auto;
      }

      .movie-details span {
        display: inline-block;
      }

      .movie-details__title {
        font-size: clamp(1rem, 3vw, 5rem);
      }

      .separator {
        width: 100%;
        border-block-start: 1px solid pink;
        margin-block-end: 1.5vh;
      }

      .movie-details__title,
      .movie-details__original-title,
      .movie-details__release,
      .movie-details__rate,
      .movie-details__genres,
      .movie-details__runtime,
      .movie-details__overview,
      .movie-details__production {
        margin-block-end: 1.5vh;
        padding-inline: 10px;
      }

      .movie-details__close {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        cursor: pointer;
        transition: transform 150ms ease-out;
      }
      
      @media (hover: hover) {
        .movie-details__close:hover {
          transform: scale(1.2);
        }
        .movie_details__close:active {
          transform: scale(1.1);
        }
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
