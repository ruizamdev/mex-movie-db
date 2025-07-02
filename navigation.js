window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith('#trends')) {
    console.log('Trends');
  } else if (location.hash.startsWith('#search=')) {
    console.log('Search');
  } else if (location.hash.startsWith('#movie=')) {
    console.log('Movie');
  } else if (location.hash.startsWith('#category=')) {
    console.log('Categories');
  } else {
    console.log('Home');
  }

  location.hash
}