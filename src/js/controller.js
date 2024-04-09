import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
//window.addEventListener('hashchange', showRecipe);
