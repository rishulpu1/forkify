import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const showSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.resultsPerPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const paginationController = function (handler) {
  resultsView.render(model.resultsPerPage(handler));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.renderEventHandler(showRecipe);
  searchView.addHandlerSearch(showSearchResults);
  paginationView.addHandlerClick(paginationController);
};
init();
//window.addEventListener('hashchange', showRecipe);
