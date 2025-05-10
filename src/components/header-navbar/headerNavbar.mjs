/* Navbar component para Mex Movie DB Site */

export class HeaderNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  };

  static get observedAttribute () {
    return [];
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    };
  };

  getTemplate(){
    const headerNavbar = document.createElement('template');
    headerNavbar.innerHTML = /* html */`
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
    `;
    return headerNavbar;
  };

  getStyles (){
    return  /* css */ `
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
    `;
  };

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  };

  setResponsive(elementToChange){
    const element = this.shadowRoot.querySelector(elementToChange)
    if(window.innerWidth > 768) {
      element.innerHTML = 'mex';
    } else if (window.innerWidth <= 768) {
      element.innerHTML = 'm';
    } else {
      console.warn(`The width of the window is ${window.innerWidth}px`) 
      console.warn(`The element ${elementToChange} is`); 
      console.warn(element);
      console.warn(`and wasnt posible to set responsive logo`);
    }
  }

  changeResponsive(elementChangedSelector){
    // console.log(headerTitle);
    window.onresize = () => {
      this.setResponsive(`${elementChangedSelector}`);
    }
  };

  interaction(){
    const header = document.querySelector('header-navbar');
    const logoTitle = header.shadowRoot.querySelector('.header-title');
    logoTitle.addEventListener('click', () => {
      location.hash = '#home';
    })
    const movieLink = header.shadowRoot.querySelector('.navbar-item-movies');
    movieLink.addEventListener('click', () => {
      location.hash = '#peliculas';
    });
    const seriesLink = header.shadowRoot.querySelector('.navbar-item-series');
    seriesLink.addEventListener('click', () => {
      location.hash = '#series';
    });
    const peopleLink  = header.shadowRoot.querySelector('.navbar-item-people');
    peopleLink.addEventListener('click', () => {
      location.hash = '#people';
    });
    const userAssets = header.shadowRoot.querySelector('.user-assets');
    const search = userAssets.querySelector('.search-icon');
    search.addEventListener('click', () => {
      location.hash = '#buscar';
    });
    const favoritesIcon = header.shadowRoot.querySelector('.favorites-icon');
    favoritesIcon.addEventListener('click', () => {
      location.hash = '#favoritos';
    });
  }

  navbarScrollTransform () {
    const header = document.querySelector('header-navbar');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        header.classList.add('header-container--scrolled');
        header.setAttribute('style', 'height: 90px;')
      } else if (window.scrollY <= 50) {
        header.classList.remove('header-container--scrolled');
        header.setAttribute('style', 'height: 120px;')
      };
    });

  };

  hovering(){
    
  };

  connectedCallback(){
    this.render();
    this.setResponsive('.header-title');
    this.changeResponsive('.header-title');
    this.interaction();
    this.navbarScrollTransform();
    this.hovering();
  };
};