export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      //`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    console.log(data);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    alert(err);
  }
};
