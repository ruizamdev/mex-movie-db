(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const d=axios.create({baseURL:"https://api.themoviedb.org/3",headers:{"Content-Type":"application/json;charset=utf-8"},params:{api_key:"bbda25d057b9c8c6bbf7f6966d3f9f1b",language:"es-MX"}});class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.sliderContainer=null,this.currentIndex=0,this.slideInterval=null,this.isPaused=!1,this.pauseSlider=this.pauseSlider.bind(this),this.resumeSlider=this.resumeSlider.bind(this)}static get ObservedAttribute(){return[]}attributeChangedCallback(){oldValue!==newValue&&this.render()}connectedCallback(){this.render(),requestAnimationFrame(()=>{this.sliderContainer=this.shadowRoot.getElementById("heroSlider"),this.populateSlider(),this.sliderContainer.addEventListener("mouseenter",this.pauseSlider),this.sliderContainer.addEventListener("mouseleave",this.resumeSlider),this.sliderContainer.addEventListener("touchstart",this.pauseSlider),this.sliderContainer.addEventListener("touchend",this.resumeSlider)})}createSlide(e,o){const i=document.createElement("div");i.classList.add("hero-slide");const t=(e.genre_ids||[]).map(r=>this.genreMap.get(r)||"Desconocido").join(", ");return i.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${e.backdrop_path})`,i.innerHTML=`
      <div id="hero-info" class="hero-info-container">
        <span class="hero-info__rank"><strong>#${o}</strong> en tendencias</span>
        <h2 class="hero-info__title">${e.title}</h2>
        <div class="movie-yearRate">
          <span class="hero-info__year">${new Date(e.release_date).getFullYear()}</span>
          <span class="hero-info__rate">⭐ ${e.vote_average.toFixed(1)}</span>
          <span class="hero-info__seasons">${e.media_type==="tv"?e.number_of_seasons+" temporadas":""}</span>
          <span class="hero-info__genres">${t}</span>
        </div>
        <p class="hero-info__synopsis">${e.overview}</p>
        <button class="hero-info__movie-btn details-button" id="${e.id}">Ver detalles</button>
      </div>
    `,i}async populateSlider(){const{data:e}=await d("/genre/movie/list?language=es_MX");this.genreMap=new Map(e.genres.map(a=>[a.id,a.name]));const{data:o}=await d("/trending/movie/day"),t=o.results.sort((a,s)=>s.popularity-a.popularity).slice(0,5);let r=0;t.forEach((a,s)=>{r++;const c=this.createSlide(a,r);s===0&&c.classList.add("active"),this.sliderContainer.appendChild(c)}),this.shadowRoot.querySelectorAll(".hero-info__movie-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.id;p(s)})}),this.startAutoSlide()}showSlide(e){this.shadowRoot.querySelectorAll(".hero-slide").forEach((i,t)=>{i.classList.remove("active"),t===e&&i.classList.add("active")})}startAutoSlide(){this.slideInterval=setInterval(()=>{this.isPaused||(this.currentIndex=(this.currentIndex+1)%5,this.showSlide(this.currentIndex))},5e3)}pauseSlider(){this.isPaused=!0}resumeSlider(){this.isPaused=!1}render(){this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <slot name="header"></slot>
      <div class="hero-slider" id="heroSlider">

      </div>
      <style>
        ${this.getStyles()}
      </style>
    `,e}getStyles(){return`
        :host {
          --primary-dark-color: #171934;
          --secondary-dark-color: #77767c;
          --tertiary-light-color: #b8b7f8;
          --secondary-light-color: #cb8dec;
          --primary-light-color: #e8ddff;
          --white: #e2e2e2;
          display: flex;
          flex-direction: column;
          /* justify-content: end; */
          width: 100%;
          background-image: url();
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .hero-slider {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 6px;
          height: 92vh;
          padding: 0 50px;
          background: linear-gradient(
            to top,
            #000,
            transparent
          );
          text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
        }

        .hero-slider::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background-image: linear-gradient(
            to top,
            black,
            transparent
          );
        }

        .hero-slide.active {
          left: 0;
          opacity: 1;
        }

        .hero-info-container {
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: flex-end;
          height: fit-content;
          padding: 45px 60px;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.68),
            transparent
          );
          text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
        }

        .hero-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 100%;
          opacity: 0;
          transition: opacity 1s, left 1s;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
        }

        .hero-info__rank {
          width: fit-content;
          font-size: clamp(1.3rem, 1.2vw, 1.5rem);
          font-weight: 700;
          border: 1px solid var(--tertiary-light-color);
          border-radius: 5px;
          padding: 5px 10px;
        }

        .hero-info__rank strong {
          color: var(--tertiary-light-color);
        }

        .hero-info__title {
          font-size: clamp(4rem, 5vw, 8rem);
          max-width: 920px;
          font-weight: 900;
          margin: 0;
        }

        .movie-yearRate {
          display: flex;
          flex-wrap: wrap;
          gap: 2%;
          margin: 5px 0;
        }

        .movie-yearRate span {
          font-size: clamp(1.4rem, 1vw, 1.6rem);
          font-weight: 700;
        }

        .hero-info__synopsis {
          font-size: clamp(1.4rem, 1.5vw, 1.8rem);
          max-width: 520px;
        }

        .hero-info__movie-btn {
          margin: 20px 0;
          width: 150px;
          max-width: 400px;
          height: 42px;
          border-radius: 5px;
          border: none;
          color: var(--primary-dark-color);
          font-size: clamp(1.7rem, 1.5vw, 1.9rem);
          background-color: var(--tertiary-light-color);
          cursor: pointer;
          box-shadow: 0px 10px 20px -18px rgb(0,0,0,0.35);
          transition: background 300ms, transform 300ms;
        }
        @media (hover: hover) {
          .hero-info__movie-btn:hover {
            transform: scale(1.03);
            background-color: var(--secondary-light-color);
            
          }
          .hero-info__movie-btn:active {
            transform: scale(1.08);
            color: var(--white);
            background-color: var(--primary-dark-color);
          }
        }

        /* Media Queries */

        /*  */

        @media (width <= 601px) {
          .hero-info-container {
            padding: 20px 25px;
          }
        }
        @media (width <= 768px) {
          .hero-info-container {
            width: 100%;
            padding: 30px 35px;
            background: rgba(0,0,0,0.40);
          }
          .hero-info__movie-btn {
            align-self: center;
            width: 100%;
          }
        }
    `}}class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttribute(){return[]}attributeChangedCallback(e,o,i){o!==i&&this.render()}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <div class="header-logo">
        <h1 class="header-title"></h1>
      </div>
    
      <nav class="navbar-container">
        <ul class="navbar">
          <li class="navbar-item-movies navbar-item">
            <span>Peliculas</span>
          </li>
          <ul class="navbar-item-movies-submenu navbar-submenu inactive">
              <li>Tendencias</li>
              <li>Mejores calificadas</li>
              <li>Por venir</li>
          </ul>
          <li class="navbar-item-series navbar-item">
            <span>Series</span>
          </li>
          <ul class="navbar-item-series-submenu navbar-submenu inactive">
              <li>Popular</li>
              <li>En TV</li>
              <li>Mejor calificadas</li>
            </ul>
          <li class="navbar-item-people navbar-item">
            <span>Personas</span>
          </li>
          <ul class="navbar-item-people-submenu navbar-submenu inactive">
              <li>Tendencias</li>
              <li>Mejores calificadas</li>
              <li>Por venir</li>
          </ul>
        </ul>
      </nav>

      <div class="user-assets">
        <form id="searchForm" class="header-searchForm">
          <input type="text" placeholder="Search..." id="search-input" class="searchForm-input inactive"/>
          <span class="search-icon-container">
            <svg version="1.1" id="search-icon" class="search-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 410.587 410.588" xml:space="preserve">
              <g>
                <path class="search-icon-path"  d="M410.587,371.351l-50.044-50.044l-39.866-39.866c20.505-28.842,32.685-63.996,32.685-102.009c0-97.424-79.263-176.687-176.684-176.687C79.251,2.745,0,82.008,0,179.432c0,97.423,79.251,176.675,176.678,176.675
              c40.698,0,78.116-13.963,108.01-37.167l68.508,68.508c0.841,0.841,1.784,1.509,2.705,2.207l18.194,18.188L410.587,371.351z
              M176.689,314.548c-74.503-0.006-135.111-60.622-135.111-135.111c0-74.5,60.614-135.108,135.111-135.108
              c74.498,0,135.108,60.608,135.108,135.108c0,30.998-10.59,59.507-28.218,82.333c-5.833,7.537-12.374,14.49-19.642,20.654
              C240.374,302.409,209.94,314.548,176.689,314.548z" fill="#E2E2E2"/>
            </g>
          </svg>
        </span>
      </form>
      <span class="favorites-icon-container">
        <svg class="favorites-icon" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
          <g clip-path="url(#clip0_91_12)">
            <path class="favorites-icon-path" d="M27.6819 33C27.4359 32.9987 27.1956 32.9259 26.9902 32.7906L16.5 25.9113L6.0098 32.7906C5.82192 32.9108 5.60567 32.9794 5.38285 32.9894C5.16003 32.9994 4.9385 32.9505 4.74057 32.8477C4.545 32.7348 4.38308 32.5718 4.27152 32.3755C4.15997 32.1791 4.10281 31.9566 4.10596 31.7308V1.26923C4.10596 0.93261 4.23968 0.609776 4.47771 0.371749C4.71573 0.133722 5.03857 0 5.37519 0L27.6819 0C28.0185 0 28.3414 0.133722 28.5794 0.371749C28.8174 0.609776 28.9511 0.93261 28.9511 1.26923V31.7308C28.9543 31.9566 28.8971 32.1791 28.7856 32.3755C28.674 32.5718 28.5121 32.7348 28.3165 32.8477C28.1219 32.9529 27.9031 33.0054 27.6819 33ZM16.5 23.1254C16.747 23.1271 16.9887 23.1974 17.1981 23.3285L26.4127 29.3827V2.53846H6.5873V29.3827L15.8019 23.3285C16.0113 23.1974 16.253 23.1271 16.5 23.1254Z" fill="#E2E2E2"/>
          </g>
          <defs>
            <clipPath id="clip0_91_12">
              <rect width="33" height="33" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </span>
      <figure id="profile-avatar" class="profile-avatar-container">
        <img src="./src/components/header-navbar/avatar.png" alt="profile avatar" class="profile-avatar">
      </figure>

      <div id="user-menu" class="user-menu vanished-menu inactive">
        <div class="menu-profile-container">
          <figure id="menu-profile-avatar" class="profile-avatar-container">
            <img src="./src/components/header-navbar/avatar.png" alt="profile avatar" class="profile-avatar">
          </figure>
          <p class="user-name"><span class="user-name-text">Armando Ruiz</span></p>
        </div>
        <ul>
          <li class="menu-options"><span class="option">Administrar perfil</span></li>
          <li class="menu-options"><span class="option">Ajustes</span></li>
          <li class="menu-options"><span class="option">Ayuda</span></li>
        </ul>
        <div class="separator"></div>
        <p class="logout"><span class="logout-text">Cerrar sesión</span></p>
      </div>
      
    </div>

    <figure class="mobile-menu">
        <svg width="35" height="35" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z" fill="#E2E2E2"/>
</svg>
      </figure>
    <style>
      ${this.getStyles()};
    </style>
    `,e}getStyles(){return`
      :host {
      --primary-dark-color: #171934;
      --secondary-dark-color: #77767c;
      --tertiary-light-color: #b8b7f8;
      --secondary-light-color: #cb8dec;
      --primary-light-color: #e8ddff;
      --white: #e2e2e2;
  
      /* fuentes */
      --font: "Inter", sans-serif;
      --font-logo: "Righteous", sans-serif;

      font-size: 62.5%;

        position: fixed;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 120px;
        color: var(--white);
        background: linear-gradient(rgb(0, 0, 0), transparent);
        z-index: 5;
        transition: 600ms;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .header-logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-block-end: 10px;
    }

    .header-container--scrolled {
        background-color: rgba(0,0,0,0.45);
        box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        backdrop-filter: blur(12px);
    }

    .header-title {
        font-family: var(--font-logo);
        font-size: 4.8em;
        letter-spacing: 4px;
        color: var(--white);
        text-shadow: rgba(0, 0, 0, 0.35) 1px 1px 3px;
        cursor: pointer;
        transition: transform 300ms, color 300ms;
    }

    .navbar-container {
        color: var(--white);
        font-family: var(--font);
        font-size: 2em;
        letter-spacing: 2px;
    }

    .navbar {
        display: flex;
        justify-content: space-evenly;
    }

    .navbar-item {
        cursor: pointer;
        list-style: none;
        transition: transform 300ms, color 300ms;
    }

    .navbar-submenu {
        position: absolute;
        top: 120px;
        left: 450px;
        background: grey;
        padding: 30px;
    }

    .navbar-submenu li {
        list-style: none;
    }

    .user-assets {
        display: flex;
        gap: 20px;
    }

    .header-searchForm {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5%;
        justify-content: center;
        flex-wrap: nowrap;
    }

    .searchForm-input {
        position: absolute;
        top: 0px;
        right: 45px;
        color: var(--white);
        padding: 0.15rem 0.5rem;
        min-height: 40px;
        border-radius: 4px;
        outline: none;
        border: none;
        border-block-end: solid 1px var(--secondary-dark-color);
        font-size: 1.8rem;
        background-color: rgba(0, 0, 0, 0);
        line-height: 1.15;
    }

    .search-icon-container {
        display: inline-block;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .search-icon {
        transition: 300ms;
    }

    .favorites-icon-container {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .favorites-icon {
        transition: transform 300ms, color 300ms;
    }

    .profile-avatar-container {
        cursor: pointer;
        width: 50px;
        margin: 0;
    }

    .profile-avatar {
        width: 100%;
        border-radius: 50%;
        transition: transform 500ms;
    }
        .inactive {
          display: none;
        }

    .user-menu {
        position: absolute;
        top: 0;
        right: 30px;
        background-color: var(--secondary-dark-color);
        border-radius:0 0 5px 5px;
        z-index: 0;
        transition: display 300ms;
        opacity: 0;
        display: none;
        animation: fadeInOut 300ms ease-in-out;
    }

    .vanished-menu {
        opacity: 1;
        display: block;
    }

    @keyframes fadeInOut {
        0% {
            opacity: 0;
            display: none;
        }

        50% {
            opacity: 0.5;
            display: block;
        }

        100% {
            opacity: 1;
            display: block;
        }
    }
    .user-menu li {
        list-style: none;
        font-size: 2rem;
        padding-block: 12px 12px;
        padding-inline: 25px 50px;
    }

    .menu-profile-container {
        display: flex;
        align-items: center;
        gap: 15px;
        padding-block: 15px 15px;
        padding-inline: 25px 50px;
        background-color: var(--primary-dark-color);
    }

    .user-name {
        font-size: 2rem;
        cursor: pointer;
    }

    .user-name-text {
        display: inline-block;
        transition: transform 300ms, color 300ms;
    }

    .separator {
        width: 90%;
        height: 1px;
        margin: 0 auto;
        background: var(--white);
    }

    .menu-options {
        font-size: 2rem;
        padding-block: 10px 10px;
        padding-inline: 25px 50px;
        cursor: pointer;
    }

    .option {
        display: inline-block;
        Transition: transform 300ms, color 300ms;
    }

    .logout {
        cursor: pointer;
        font-size: 2rem;
        padding-block: 10px 10px;
        padding-inline: 25px 50px;
    }

    .logout-text {
        display: inline-block;
        transition: transform 300ms, color 300ms;
    }

    .inactive {
      display: none;
    }

    @media (min-width: 1441px){
      .navbar-container {
        width: 35%;
        max-width: 640px;
      }
      .mobile-menu {
        display: none;
      }
    }
    @media (max-width: 1440px){
      .navbar-container {
        width: 45%;
      }
      .mobile-menu {
        display: none;
      }
    }
    @media (max-width: 1280px){
      .navbar-container {
        width: 55%;
      }
    }
    @media (max-width: 1024px){
      .navbar-container {
        width: 55%;
      }
    }
    @media (max-width: 768px){
      .navbar-container {
        width: 58%;
      }
      .navbar {
        display: none;
      }
      .user-assets {
        display: none;
      }
      .mobile-menu {
        display: block;
      }
    }
    @media (max-width: 600px){
      .navbar {
        display: none;
      }
      .user-assets {
        display: none;
      }
    }
    @media (max-width: 480px){
      .navbar {
        display: none;
      }
      .user-assets {
        display: none;
      }
    }
    @media (hover: hover) {
        .header-logo:hover .header-title {
          transform: scale(1.15);
          color: var(--secondary-light-color);
        }
        .header-logo:active .header-title {
          transform: scale(1.20);
          color: var(--primary-dark-color);
        }
        .navbar-item:hover {
          transform: scale(1.15);
          color: var(--secondary-light-color);
        }
        .navbar-item:active {
          transform: scale(1.20);
          color: var(--primary-dark-color);
        }
        .search-icon-container:hover .search-icon {
          transform: scale(1.15);
        }
        .search-icon-container:active .search-icon {
          transform: scale(1.20);
        }
        .search-icon-container:hover .search-icon-path {
          fill: var(--secondary-light-color);
        }
        .search-icon-container:active .search-icon-path {
          fill: var(--primary-dark-color)
        }
        .favorites-icon-container:hover .favorites-icon {
          transform: scale(1.15);
        }
        .favorites-icon-container:active .favorites-icon {
          transform: scale(1.20);
        }
        .favorites-icon-container:hover .favorites-icon-path {
          fill: var(--secondary-light-color);
        }
        .favorites-icon-container:active .favorites-icon-path {
          fill: var(--primary-dark-color);
        }
        .profile-avatar-container:hover img {
          transform: scale(1.15);
        }
        .profile-avatar-container:active img {
          transform: scale(1.20);
        }
        .profile-avatar-container:hover .user-menu {
          display: block;
        }
        .user-name:hover .user-name-text {
          transform: scale(1.1);
          color: var(--secondary-light-color);
        }
        .menu-options:hover .option {
          transform: scale(1.1);
          color: var(--secondary-light-color);
        }
        .logout:hover .logout-text {
          transform: scale(1.1);
          color: var(--secondary-light-color);
        }
    }
    `}render(){this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}setResponsive(e){const o=this.shadowRoot.querySelector(e);window.innerWidth>768?o.innerHTML="mex":window.innerWidth<=768?o.innerHTML="m":(console.warn(`The width of the window is ${window.innerWidth}px`),console.warn(`The element ${e} is`),console.warn(o),console.warn("and wasnt posible to set responsive logo"))}changeResponsive(e){window.onresize=()=>{this.setResponsive(`${e}`)}}interaction(){const e=document.querySelector("header-navbar");e.shadowRoot.querySelector(".header-title").addEventListener("click",()=>{location.hash="#home"}),e.shadowRoot.querySelector(".navbar-item-movies").addEventListener("click",()=>{location.hash="#peliculas"}),e.shadowRoot.querySelector(".navbar-item-series").addEventListener("click",()=>{location.hash="#series"}),e.shadowRoot.querySelector(".navbar-item-people").addEventListener("click",()=>{location.hash="#people"}),e.shadowRoot.querySelector(".user-assets").querySelector(".search-icon").addEventListener("click",()=>{location.hash="#buscar"}),e.shadowRoot.querySelector(".favorites-icon").addEventListener("click",()=>{location.hash="#favoritos"})}navbarScrollTransform(){const e=document.querySelector("header-navbar");window.addEventListener("scroll",()=>{window.scrollY>=50?(e.classList.add("header-container--scrolled"),e.setAttribute("style","height: 90px;")):window.scrollY<=50&&(e.classList.remove("header-container--scrolled"),e.setAttribute("style","height: 120px;"))})}hovering(){}connectedCallback(){this.render(),this.setResponsive(".header-title"),this.changeResponsive(".header-title"),this.interaction(),this.navbarScrollTransform(),this.hovering()}}class v extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.populateTrendingSection(),this.scrolling()}disconnectedCallback(){}async populateTrendingSection(){const{data:e}=await d("/genre/movie/list?language=es-MX");this.genreMap=new Map(e.genres.map(t=>[t.id,t.name]));const{data:o}=await d("/trending/movie/day?language=es_MX");o.results.sort((t,r)=>r.popularity-t.popularity).forEach((t,r)=>this.createMovieCard(t,r+1))}createMovieCard(e,o){const i=document.createElement("li");i.classList.add("movie-container");const t=(e.genre_ids||[]).map(a=>this.genreMap.get(a)||"Desconocido").join(", ");i.innerHTML=`
      <img class="movie-img" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />
      <div class="movie-details hidden">
        <span class="top-number"><strong>#${o}</strong></span>
        <span class="movie-title"><strong>Titulo</strong>: ${e.title}</span>
        <span class="movie-year"><strong>Año</strong>: ${e.release_date.slice(0,4)}</span>
        <span class="movie-rate"><strong>Calificación</strong>: ${e.vote_average.toFixed(1)}</span>
        <span class="movie-genres"><strong>Género</strong>: ${t}</span>
        <button id="${e.id}" class="movie-btn details-button">Ver detalles</button>
      </div>
    `;const r=i.querySelector(".movie-details");i.addEventListener("mouseenter",()=>r.classList.remove("hidden")),i.addEventListener("mouseleave",()=>r.classList.add("hidden")),i.querySelector(".movie-btn.details-button").addEventListener("click",a=>{const s=a.target.id;p(s)}),this.shadowRoot.querySelector(".trendingPreview-movieList").appendChild(i)}scrolling(){const e=this.shadowRoot.querySelector(".trendingPreview-movieList");this.shadowRoot.querySelector(".scroll-btn.next").addEventListener("click",()=>e.scrollBy({left:e.clientWidth,behavior:"smooth"})),this.shadowRoot.querySelector(".scroll-btn.prev").addEventListener("click",()=>e.scrollBy({left:-e.clientWidth,behavior:"smooth"}))}render(){this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <section class="trendingPreview">
        <h2>Top 20 Películas en Tendencias</h2>
          <ul class="trendingPreview-movieList">
          <button class="scroll-btn prev" aria-label="Anterior">❮</button>
          <button class="scroll-btn next" aria-label="Siguiente">❯</button>
            <!-- slides -->
          </ul>
      </section>
      <style>${this.getStyles()}</style>
    `,e}getStyles(){return`
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
    `}}class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.populateSeriesSection(),this.scrolling()}disconnectedCallback(){}async populateSeriesSection(){const{data:e}=await d("/trending/tv/day?language=es_MX");e.results.sort((i,t)=>t.popularity-i.popularity).forEach((i,t)=>this.createMovieCard(i,t+1))}createMovieCard(e,o){const i=document.createElement("li");i.classList.add("serie-container"),i.innerHTML=`
      <img class="serie-img" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />
      <div class="serie-details hidden">
        <span class="top-number"><strong>#${o}</strong></span>
        <span class="serie-title"><strong>Titulo</strong>: ${e.title}</span>
        <span class="serie-rate"><strong>Calificación</strong>: ${e.vote_average.toFixed(1)}</span>
        <button id="${e.id}" class="serie-btn details-button">Ver detalles</button>
      </div>
    `;const t=i.querySelector(".serie-details");i.addEventListener("mouseenter",()=>t.classList.remove("hidden")),i.addEventListener("mouseleave",()=>t.classList.add("hidden")),i.querySelector(".serie-btn.details-button").addEventListener("click",n=>{const a=n.target.id;createMovieDetailsWindow(a)}),this.shadowRoot.querySelector(".trendingPreview-movieList").appendChild(i)}scrolling(){const e=this.shadowRoot.querySelector(".trendingPreview-movieList");this.shadowRoot.querySelector(".scroll-btn.next").addEventListener("click",()=>e.scrollBy({left:e.clientWidth,behavior:"smooth"})),this.shadowRoot.querySelector(".scroll-btn.prev").addEventListener("click",()=>e.scrollBy({left:-e.clientWidth,behavior:"smooth"}))}render(){this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <section class="trendingPreview">
        <h2>Top 20 Series de TV en Tendencias</h2>
          <ul class="trendingPreview-movieList">
          <button class="scroll-btn prev" aria-label="Anterior">❮</button>
          <button class="scroll-btn next" aria-label="Siguiente">❯</button>
            <!-- slides -->
          </ul>
      </section>
      <style>${this.getStyles()}</style>
    `,e}getStyles(){return`
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

      .serie-container {
        flex: 0 0 auto; /* No se expandirá ni contraerá */
        scroll-snap-align: start; /* Alinear al inicio del contenedor */
        position: relative; 
        width: 19.8%;
      }

      .serie-img {
          display: block;
          width: 100%;
      }
      .serie-details {
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

      .serie-details span {
        font-size: clamp(1.2rem, 2vw, 2rem);
        margin-inline: min(4rem, 6vw);
      }

      .serie-details span strong {
        color: var(--secondary-light-color);
      }

      .serie-details span.top-number {
        font-size: clamp(1.5rem, 3vw, 4rem);
      }

      .serie-btn {
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

      .serie-btn:hover {
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
    `}}class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.movieId=this.getAttribute("movie-id")}static get observedAttributes(){return["movie-id"]}attributeChangedCallback(e,o,i){o!==i&&this.loadMovieDetails(i)}connectedCallback(){this.render(),this.loadMovieDetails()}disconnectedCallback(){}async loadMovieDetails(e){if(!e)return;const{data:o}=await d(`https://api.themoviedb.org/3/movie/${e}`);this.createMovieDetailsWindow(o)}createMovieDetailsWindow(e){const o=document.createElement("section");o.classList.add("details-container"),this.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${e.backdrop_path})`,o.innerHTML=`
      <div class="movie-poster-container">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}"/>
      </div>
      <div class="movie-details">
        <h2 class="movie-details__title">${e.title}</h2>
        <div class="separator"></div>
        <p class="movie-details__original-title"><i>Título original: ${e.original_title}</i></p>
        <span class="movie-details__release">Fecha de estreno: ${this.dateFormat(e.release_date)}</span>
        <span class="movie-details__rate">Calificación: ⭐ ${e.vote_average.toFixed(1)}</span>
        <span class="movie-details__genres">Género: ${e.genres.map(t=>t.name).join(", ")}</span>
        <span class="movie-details__runtime">Duración: ${e.runtime} min.</span>
        <p class="movie-details__overview">${e.overview}</p>
        <div class="movie-details__production">
          <span class="movie-details__production__title">Productoras:</span>
          <span class="movie-details__production__name">${(e.production_companies||[]).map(t=>t.name).join(", ")}</span> 
      </div>
      <span class="movie-details__close">
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="currentColor"/>
        </svg>
      </span>
    `,o.querySelector(".movie-details__close").addEventListener("click",()=>{this.remove(),document.body.style.position="static",document.body.style.inset="0"}),this.shadowRoot.querySelector(".movie-details-container").appendChild(o)}dateFormat(e){const o=new Date(e),i={day:"numeric",month:"long",year:"numeric"};return new Intl.DateTimeFormat("es-MX",i).format(o)}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <div class="movie-details-container">

      </div>
      <style>${this.getStyles()}</style>
    `,e}getStyles(){return`

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
    `}render(){this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}}customElements.define("the-hero",m);customElements.define("header-navbar",h);customElements.define("trending-section",v);customElements.define("series-section",u);customElements.define("movie-details-window",g);function p(l){const e=document.body;e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.bottom="0",e.style.right="0";const o=document.createElement("movie-details-window");o.setAttribute("movie-id",l),e.prepend(o)}
