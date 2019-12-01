import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';

/** Global state of app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes 
 */
const state = {};


/**
 * Search controller
 * @param {string} query 
 */
const controlSearch = async (query) => {

    if (query) {
        // New search object added to state
        state.search = new Search(query, 30);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();

        renderLoader(elements.searchResults);
        // Search for recipes
        try {
            await state.search.getResults();
            // Render results on UI
            searchView.renderResults(state.search.results);
            clearLoader(elements.searchResults);

        } catch (error) {
            console.log(error);
            clearLoader(elements.searchResults);
        }
    }
};


elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    let q = searchView.getInput();
    controlSearch(q);
});

// TEST
window.addEventListener('load', e => {
    e.preventDefault();
    let q = `honey`;
    controlSearch(q);
    state.likes = new Likes();
});

elements.searchResultPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline', );
    if (btn) {

        const page = parseInt(btn.dataset.goto);

        searchView.clearInput();
        searchView.clearResults();
        searchView.clearButtons();
        renderLoader(elements.searchResults);
        searchView.renderResults(state.search.results, page);
        clearLoader(elements.searchResults);
    }
});

/**
 * Recipe controller
 */
const controlRecipe = async (e) => {

    // const id = e.newURL.split('/#')[1];
    const id = window.location.hash.replace('#', '');
    if (id) {

        // Prepare UI

        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        searchView.highlightSelected(id);

        // Create new Recipe
        state.recipe = new Recipe(id);

        try {
            // Get data
            await state.recipe.getRecipe();
            state.recipe.getIngredients();
            // Render recipe
            clearLoader(elements.recipe);
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
            likesView.toglleLikeMenu(state.likes.getNumLikes());

            // TESTING
            console.log(state.recipe);
            window.state = state;

        } catch (error) {
            console.log(error);
        }

    }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/**
 * Like controller
 */
const controlLike = () => {

    if (!state.likes) state.likes = new Likes();
    const currID = state.recipe.id;

    if (!state.likes.isLiked(currID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        )
        // Toggle button
        likesView.toggleLikeBtn(true);

        // Add like to the UI list
        likesView.renderLike(newLike);

    } else {
        // Remove like from state
        state.likes.deleteLike(currID);
        // Toggle button
        likesView.toggleLikeBtn(false);
        // Remove like from UI list
        likesView.deleteLike(currID);
    }
    likesView.toglleLikeMenu(state.likes.getNumLikes())
}

/**
 * Recipe buttons handler
 */
elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.updateServings('dec');
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe);
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like control
        console.log('like');
        controlLike();
    }

});

/**
 * List controller
 */

const controlList = () => {

    if (!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

};

/**
 * Shopping list button handler
 */
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});