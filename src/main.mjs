import { TheHero } from './components/the-hero/theHero.mjs';
import { HeaderNavbar } from './components/header-navbar/headerNavbar.mjs';
import { TrendingSection } from './components/trending-section/trendingSectionV2.mjs';
import { SeriesSection } from './components/series-section/seriesSectionV2.mjs';
import { MovieDetailsWindow } from './components/movie-details-window/movieDetailsWindow.mjs';

customElements.define('the-hero', TheHero);
customElements.define('header-navbar', HeaderNavbar);
customElements.define('trending-section', TrendingSection);
customElements.define('series-section', SeriesSection);
customElements.define('movie-details-window', MovieDetailsWindow);

function createMovieDetailsWindow(movieId) {
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.left = '0';
    body.style.bottom = '0';
    body.style.right = '0';
    const movieDetailsWindow = document.createElement('movie-details-window');
    movieDetailsWindow.setAttribute('movie-id', movieId);
    body.prepend(movieDetailsWindow);
  }

  export { createMovieDetailsWindow };