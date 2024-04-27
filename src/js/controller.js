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
    // update results view to mark selected search result
    resultsView.update(model.resultsPerPage());
    // loading recipe
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
    resultsView.render(model.resultsPerPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const paginationController = function (handler) {
  resultsView.render(model.resultsPerPage(handler));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // Update Servings Handler
  model.updateServings(newServing);

  //Rerender view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.renderEventHandler(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(showSearchResults);
  paginationView.addHandlerClick(paginationController);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();
//window.addEventListener('hashchange', showRecipe);
